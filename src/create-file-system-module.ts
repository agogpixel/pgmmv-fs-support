import type { ReleaseLock, ResourceLocksManagerProtectedApi } from '@agogpixel/pgmmv-resource-support/src/locks';
import { createResourceLocksManager } from '@agogpixel/pgmmv-resource-support/src/locks';
import { getModule, hasModule, setModule } from '@agogpixel/pgmmv-resource-support/src/module';
import { getStringByteLength } from '@agogpixel/pgmmv-resource-support/src/string';
import { pollWithBackoff, pollWithInterval } from '@agogpixel/pgmmv-resource-support/src/time';

import type {
  AppendFileOperationPayload,
  CreateDirectoryOperationPayload,
  FileOperation,
  ReadFileOperationPayload,
  ReadSizeFileOperationPayload,
  RemoveDirectoryOperationPayload,
  RemoveFileOperationPayload,
  RenameFileOperationPayload,
  WriteFileOperationPayload
} from './operation';
import { ExclusiveFileOperationType, SharedFileOperationType } from './operation';
import type { FileSystemModule } from './file-system-module';

/**
 *
 * @returns
 */
export function createFileSystemModule() {
  /**
   *
   */
  const self = {} as FileSystemModule;

  // Singleton.
  if (hasModule('fs')) {
    return getModule('fs') as FileSystemModule;
  } else if (!setModule('fs', self)) {
    return undefined;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Internal
  //////////////////////////////////////////////////////////////////////////////

  /**
   *
   */
  const operationQueues: Record<string, FileOperation[]> = {};

  /**
   *
   */
  const locksManagerInternal = {} as ResourceLocksManagerProtectedApi;

  /**
   *
   */
  const locksManager = createResourceLocksManager(locksManagerInternal);

  /**
   *
   * @param operation
   */
  function enqueueOperation(operation: FileOperation) {
    const path =
      operation.type === ExclusiveFileOperationType.Rename
        ? `${operation.payload.dirPath}/${operation.payload.oldName}`
        : operation.payload.path;

    if (!locksManager.hasLocks(path)) {
      locksManager.createLocks({ key: path, numSharedLocks: 2, exclusiveLock: true });
    }

    if (!operationQueues[path]) {
      operationQueues[path] = [];
    }

    operationQueues[path].push(operation);
  }

  /**
   *
   * @param path
   * @returns
   */
  function dequeueOperation(path: string) {
    if (!operationQueues[path] || !operationQueues[path].length) {
      return;
    }

    const operation = operationQueues[path].shift();

    if (!operationQueues[path].length) {
      locksManager.destroyLocks(path);
      delete operationQueues[path];
    }

    return operation;
  }

  /**
   *
   * @param path
   * @returns
   */
  function peekOperationType(path: string) {
    if (!operationQueues[path] || !operationQueues[path].length) {
      return;
    }

    return operationQueues[path][0].type;
  }

  /**
   *
   * @returns
   */
  function pollOperationQueues(): false {
    const paths = Object.keys(operationQueues);

    for (const path of paths) {
      if (!operationQueues[path] || !operationQueues[path].length) {
        continue;
      }

      const operationType = peekOperationType(path);

      let releaseLock: ReleaseLock | undefined;

      switch (operationType) {
        case ExclusiveFileOperationType.Append:
        case ExclusiveFileOperationType.Remove:
        case ExclusiveFileOperationType.Rename:
        case ExclusiveFileOperationType.Write:
        case ExclusiveFileOperationType.CreateDirectory:
        case ExclusiveFileOperationType.RemoveDirectory:
          releaseLock = locksManager.acquireExclusiveLock(path);
          break;
        case SharedFileOperationType.Read:
        case SharedFileOperationType.ReadSize:
          releaseLock = locksManager.acquireSharedLock(path);
          break;
      }

      if (!releaseLock) {
        continue;
      }

      const operation = dequeueOperation(path) as FileOperation;

      switch (operation.type) {
        case ExclusiveFileOperationType.Write:
          writeFileOperation(operation.payload, releaseLock);
          break;
        case ExclusiveFileOperationType.Append:
          appendFileOperation(operation.payload, releaseLock);
          break;
        case ExclusiveFileOperationType.Rename:
          renameFileOperation(operation.payload, releaseLock);
          break;
        case ExclusiveFileOperationType.Remove:
          removeFileOperation(operation.payload, releaseLock);
          break;
        case ExclusiveFileOperationType.CreateDirectory:
          createDirectoryOperation(operation.payload, releaseLock);
          break;
        case ExclusiveFileOperationType.RemoveDirectory:
          removeDirectoryOperation(operation.payload, releaseLock);
          break;
        case SharedFileOperationType.Read:
          readFileOperation(operation.payload, releaseLock);
          break;
        case SharedFileOperationType.ReadSize:
          readSizeFileOperation(operation.payload, releaseLock);
          break;
      }
    }

    return false;
  }

  /**
   *
   * @param payload
   * @param releaseLock
   * @returns
   */
  function writeFileOperation(payload: WriteFileOperationPayload, releaseLock: () => void) {
    const path = payload.path;
    const data = payload.data;
    const callback = payload.callback;

    const fileSize = jsb.fileUtils.getFileSize(path);
    const dataSize = getStringByteLength(data);

    let conditional: () => boolean;

    if (fileSize !== dataSize) {
      // Poll file size change.
      conditional = function conditional() {
        return dataSize === jsb.fileUtils.getFileSize(path);
      };
    } else {
      // Poll file content change.
      conditional = function conditional() {
        return data === jsb.fileUtils.getStringFromFile(path);
      };
    }

    function onProceed() {
      releaseLock();
      callback(true);
    }

    function onTimeout(elapsed: number) {
      releaseLock();
      callback(false, `Write operation to '${path}' timed out after ${elapsed / 1000}s`);
    }

    const result = jsb.fileUtils.writeStringToFile(data, path);

    if (!result) {
      releaseLock();
      callback(false, `Write operation to '${path}' failed immediately`);
      return;
    }

    pollWithBackoff(conditional, onProceed, onTimeout, 1000, 5);
  }

  /**
   *
   * @param payload
   * @param releaseLock
   * @returns
   */
  function appendFileOperation(payload: AppendFileOperationPayload, releaseLock: () => void) {
    const path = payload.path;
    const data = payload.data;
    const callback = payload.callback;

    const oldFileContent = jsb.fileUtils.getStringFromFile(path);
    const newFileContent = `${oldFileContent ? oldFileContent + '\n' : ''}${data}`;
    const newFileSize = getStringByteLength(newFileContent);

    function conditional() {
      return newFileSize === jsb.fileUtils.getFileSize(path);
    }

    function onProceed() {
      releaseLock();
      callback(true);
    }

    function onTimeout(elapsed: number) {
      releaseLock();
      callback(false, `Append operation to '${path}' timed out after ${elapsed / 1000}s`);
    }

    const result = jsb.fileUtils.writeStringToFile(newFileContent, path);

    if (!result) {
      releaseLock();
      callback(false, `Append operation to '${path}' failed immediately`);
      return;
    }

    pollWithBackoff(conditional, onProceed, onTimeout, 1000, 5);
  }

  /**
   *
   * @param payload
   * @param releaseLock
   * @returns
   */
  function renameFileOperation(payload: RenameFileOperationPayload, releaseLock: () => void) {
    const dirPath = payload.dirPath;
    const oldName = payload.oldName;
    const newName = payload.newName;
    const callback = payload.callback;

    const path = `${dirPath}/${oldName}`;
    const newPath = `${dirPath}/${newName}`;

    function conditional() {
      return jsb.fileUtils.isFileExist(newPath);
    }

    function onProceed() {
      releaseLock();
      callback(true);
    }

    function onTimeout(elapsed: number) {
      releaseLock();
      callback(false, `Rename operation of '${path}' to '${newPath}' timed out after ${elapsed / 1000}s`);
    }

    const result = jsb.fileUtils.renameFile(dirPath, oldName, newName);

    if (!result) {
      releaseLock();
      callback(false, `Rename operation of '${path}' to '${newPath}' failed immediately`);
      return;
    }

    pollWithBackoff(conditional, onProceed, onTimeout, 1000, 5);
  }

  /**
   *
   * @param payload
   * @param releaseLock
   * @returns
   */
  function removeFileOperation(payload: RemoveFileOperationPayload, releaseLock: () => void) {
    const path = payload.path;
    const callback = payload.callback;

    function conditional() {
      return !jsb.fileUtils.isFileExist(path);
    }

    function onProceed() {
      releaseLock();
      callback(true);
    }

    function onTimeout(elapsed: number) {
      releaseLock();
      callback(false, `Remove operation of '${path}' timed out after ${elapsed / 1000}s`);
    }

    const result = jsb.fileUtils.removeFile(path);

    if (!result) {
      releaseLock();
      callback(false, `Remove operation of '${path}' failed immediately`);
      return;
    }

    pollWithBackoff(conditional, onProceed, onTimeout, 1000, 5);
  }

  /**
   *
   * @param payload
   * @param releaseLock
   * @returns
   */
  function createDirectoryOperation(payload: CreateDirectoryOperationPayload, releaseLock: () => void) {
    const path = payload.path;
    const callback = payload.callback;

    function conditional() {
      return jsb.fileUtils.isDirectoryExist(path);
    }

    function onProceed() {
      releaseLock();
      callback(true);
    }

    function onTimeout(elapsed: number) {
      releaseLock();
      callback(false, `Create operation of '${path}' timed out after ${elapsed / 1000}s`);
    }

    const result = jsb.fileUtils.createDirectory(path);

    if (!result) {
      releaseLock();
      callback(false, `Create operation of '${path}' failed immediately`);
      return;
    }

    pollWithBackoff(conditional, onProceed, onTimeout, 1000, 5);
  }

  /**
   *
   * @param payload
   * @param releaseLock
   * @returns
   */
  function removeDirectoryOperation(payload: RemoveDirectoryOperationPayload, releaseLock: () => void) {
    const path = payload.path;
    const callback = payload.callback;

    function conditional() {
      return !jsb.fileUtils.isDirectoryExist(path);
    }

    function onProceed() {
      releaseLock();
      callback(true);
    }

    function onTimeout(elapsed: number) {
      releaseLock();
      callback(false, `Remove operation of '${path}' timed out after ${elapsed / 1000}s`);
    }

    const result = jsb.fileUtils.removeDirectory(path);

    if (!result) {
      releaseLock();
      callback(false, `Remove operation of '${path}' failed immediately`);
      return;
    }

    pollWithBackoff(conditional, onProceed, onTimeout, 1000, 5);
  }

  /**
   *
   * @param payload
   * @param releaseLock
   * @returns
   */
  function readFileOperation(payload: ReadFileOperationPayload, releaseLock: () => void) {
    const path = payload.path;
    const callback = payload.callback;

    const result = jsb.fileUtils.getStringFromFile(path);

    releaseLock();

    if (typeof result !== 'string') {
      callback(false, `Read operation of '${path}' failed immediately`);
      return;
    }

    callback(true, result);
  }

  /**
   *
   * @param payload
   * @param releaseLock
   * @returns
   */
  function readSizeFileOperation(payload: ReadSizeFileOperationPayload, releaseLock: () => void) {
    const path = payload.path;
    const callback = payload.callback;

    const result = jsb.fileUtils.getFileSize(path);

    releaseLock();

    if (typeof result !== 'number') {
      callback(false, `Read size operation of '${path}' failed immediately`);
      return;
    }

    callback(true, result);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public API
  //////////////////////////////////////////////////////////////////////////////

  /**
   *
   * @param path
   * @param callback
   * @returns
   */
  self.createDirectory = function createDirectory(path, callback) {
    enqueueOperation({
      type: ExclusiveFileOperationType.CreateDirectory,
      payload: {
        path,
        callback
      }
    });

    return self;
  };

  /**
   *
   * @param path
   * @returns
   */
  self.isAbsolutePath = function isAbsolutePath(path) {
    return jsb.fileUtils.isAbsolutePath(path);
  };

  /**
   *
   * @param path
   * @returns
   */
  self.isDirectory = function isDirectory(path) {
    return jsb.fileUtils.isDirectoryExist(path);
  };

  /**
   *
   * @param path
   * @returns
   */
  self.isFile = function isFile(path) {
    return jsb.fileUtils.isFileExist(path);
  };

  /**
   *
   * @param path
   * @param callback
   * @returns
   */
  self.removeDirectory = function removeDirectory(path, callback) {
    enqueueOperation({
      type: ExclusiveFileOperationType.RemoveDirectory,
      payload: {
        path,
        callback
      }
    });

    return self;
  };

  /**
   *
   * @param path
   * @param callback
   * @returns
   */
  self.removeFile = function removeFile(path, callback) {
    enqueueOperation({
      type: ExclusiveFileOperationType.Remove,
      payload: {
        path,
        callback
      }
    });

    return self;
  };

  /**
   *
   * @param dirPath
   * @param oldName
   * @param newName
   * @param callback
   * @returns
   */
  self.renameFile = function renameFile(dirPath, oldName, newName, callback) {
    enqueueOperation({
      type: ExclusiveFileOperationType.Rename,
      payload: {
        dirPath,
        oldName,
        newName,
        callback
      }
    });

    return self;
  };

  /**
   *
   * @param path
   * @param callback
   * @returns
   */
  self.readFile = function readFile(path, callback) {
    enqueueOperation({
      type: SharedFileOperationType.Read,
      payload: {
        path,
        callback
      }
    });

    return self;
  };

  /**
   *
   * @param path
   * @param callback
   * @returns
   */
  self.readFileSize = function readFileSize(path, callback) {
    enqueueOperation({
      type: SharedFileOperationType.ReadSize,
      payload: {
        path,
        callback
      }
    });

    return self;
  };

  /**
   *
   * @param dataStr
   * @param path
   * @param callback
   * @returns
   */
  self.writeFile = function writeFile(dataStr, path, callback) {
    enqueueOperation({
      type: ExclusiveFileOperationType.Write,
      payload: {
        data: dataStr,
        path,
        callback
      }
    });

    return self;
  };

  /**
   *
   * @param dataStr
   * @param path
   * @param callback
   * @returns
   */
  self.appendFile = function appendFile(dataStr, path, callback) {
    enqueueOperation({
      type: ExclusiveFileOperationType.Append,
      payload: {
        data: dataStr,
        path,
        callback
      }
    });

    return self;
  };

  // Poll indefinitely.
  pollWithInterval(
    pollOperationQueues,
    function () {
      return;
    },
    function () {
      return;
    },
    500
  );

  return self;
}
