/**
 * Exports create file system module function.
 *
 * @module
 */
import type { ReleaseLock } from '@agogpixel/pgmmv-resource-support/src/locks/release-lock.type';
import { createResourceLocksManager } from '@agogpixel/pgmmv-resource-support/src/locks/create-resource-locks-manager.function';
import { getModule } from '@agogpixel/pgmmv-resource-support/src/module/get-module.function';
import { hasModule } from '@agogpixel/pgmmv-resource-support/src/module/has-module.function';
import { setModule } from '@agogpixel/pgmmv-resource-support/src/module/set-module.function';
import { pollWithInterval } from '@agogpixel/pgmmv-resource-support/src/time/poll-with-interval.function';

import type { FileSystemOperationUnion } from './operations';
import {
  appendFileOperation,
  createDirectoryOperation,
  ExclusiveFileSystemOperationType,
  readFileOperation,
  readFileSizeOperation,
  removeDirectoryOperation,
  removeFileOperation,
  renameFileOperation,
  SharedFileSystemOperationType,
  writeFileOperation
} from './operations';
import type { FileSystemModule } from './file-system-module.type';

////////////////////////////////////////////////////////////////////////////////
// Public Static Properties
////////////////////////////////////////////////////////////////////////////////

// None.

////////////////////////////////////////////////////////////////////////////////
// Private Static Properties
////////////////////////////////////////////////////////////////////////////////

/**
 * File system module key.
 *
 * @private
 * @static
 */
const fsModuleKey = 'fs';

/**
 * Number of shared locks per file system resource.
 *
 * @private
 * @static
 */
const numSharedLocks = 2;

////////////////////////////////////////////////////////////////////////////////
// Public Static Methods
////////////////////////////////////////////////////////////////////////////////

/**
 * Create file system module.
 *
 * @returns File system module global singleton.
 */
export function createFileSystemModule() {
  // Public API container.
  const self = {} as FileSystemModule;

  // Singleton.
  if (hasModule(fsModuleKey)) {
    return getModule(fsModuleKey) as FileSystemModule;
  } else if (!setModule(fsModuleKey, self)) {
    return undefined;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * File system resource operation queues.
   *
   * @private
   */
  const operationQueues: Record<string, FileSystemOperationUnion[]> = {};

  /**
   * File system resource locks manager.
   *
   * @private
   */
  const locksManager = createResourceLocksManager();

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Enqueue a file system operation.
   *
   * @param operation File system operation.
   * @private
   */
  function enqueueOperation(operation: FileSystemOperationUnion) {
    const path =
      operation.type === ExclusiveFileSystemOperationType.RenameFile
        ? `${operation.payload.dirPath}/${operation.payload.oldName}`
        : operation.payload.path;

    if (!locksManager.hasLocks(path)) {
      locksManager.createLocks({ key: path, numSharedLocks, exclusiveLock: true });
    }

    if (!operationQueues[path]) {
      operationQueues[path] = [];
    }

    operationQueues[path].push(operation);
  }

  /**
   * Dequeue a file system operation for specified path.
   *
   * @param path File system path.
   * @returns File system operation or `undefined`.
   * @private
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
   * Peek next file system operation type in the queue for specified path.
   *
   * @param path File system path.
   * @returns File system operation type of `undefined`.
   * @private
   */
  function peekOperationType(path: string) {
    if (!operationQueues[path] || !operationQueues[path].length) {
      return;
    }

    return operationQueues[path][0].type;
  }

  /**
   * Poll file system operation queues.
   *
   * @returns False to ensure continuous polling.
   * @private
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
        case ExclusiveFileSystemOperationType.AppendFile:
        case ExclusiveFileSystemOperationType.RemoveFile:
        case ExclusiveFileSystemOperationType.RenameFile:
        case ExclusiveFileSystemOperationType.WriteFile:
        case ExclusiveFileSystemOperationType.CreateDirectory:
        case ExclusiveFileSystemOperationType.RemoveDirectory:
          releaseLock = locksManager.acquireExclusiveLock(path);
          break;
        case SharedFileSystemOperationType.ReadFile:
        case SharedFileSystemOperationType.ReadFileSize:
          releaseLock = locksManager.acquireSharedLock(path);
          break;
      }

      if (!releaseLock) {
        continue;
      }

      const operation = dequeueOperation(path) as FileSystemOperationUnion;

      switch (operation.type) {
        case ExclusiveFileSystemOperationType.WriteFile:
          writeFileOperation(operation.payload, releaseLock);
          break;
        case ExclusiveFileSystemOperationType.AppendFile:
          appendFileOperation(operation.payload, releaseLock);
          break;
        case ExclusiveFileSystemOperationType.RenameFile:
          renameFileOperation(operation.payload, releaseLock);
          break;
        case ExclusiveFileSystemOperationType.RemoveFile:
          removeFileOperation(operation.payload, releaseLock);
          break;
        case ExclusiveFileSystemOperationType.CreateDirectory:
          createDirectoryOperation(operation.payload, releaseLock);
          break;
        case ExclusiveFileSystemOperationType.RemoveDirectory:
          removeDirectoryOperation(operation.payload, releaseLock);
          break;
        case SharedFileSystemOperationType.ReadFile:
          readFileOperation(operation.payload, releaseLock);
          break;
        case SharedFileSystemOperationType.ReadFileSize:
          readFileSizeOperation(operation.payload, releaseLock);
          break;
      }
    }

    return false;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Protected Properties
  //////////////////////////////////////////////////////////////////////////////

  // None.

  //////////////////////////////////////////////////////////////////////////////
  // Protected Methods
  //////////////////////////////////////////////////////////////////////////////

  // None.

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  // None.

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////

  self.createDirectory = function (path, callback) {
    enqueueOperation({
      type: ExclusiveFileSystemOperationType.CreateDirectory,
      payload: {
        path,
        callback
      }
    });

    return self;
  };

  self.isAbsolutePath = function (path) {
    return jsb.fileUtils.isAbsolutePath(path);
  };

  self.isDirectory = function (path) {
    return jsb.fileUtils.isDirectoryExist(path);
  };

  self.isFile = function (path) {
    return jsb.fileUtils.isFileExist(path);
  };

  self.removeDirectory = function (path, callback) {
    enqueueOperation({
      type: ExclusiveFileSystemOperationType.RemoveDirectory,
      payload: {
        path,
        callback
      }
    });

    return self;
  };

  self.removeFile = function (path, callback) {
    enqueueOperation({
      type: ExclusiveFileSystemOperationType.RemoveFile,
      payload: {
        path,
        callback
      }
    });

    return self;
  };

  self.renameFile = function (dirPath, oldName, newName, callback) {
    enqueueOperation({
      type: ExclusiveFileSystemOperationType.RenameFile,
      payload: {
        dirPath,
        oldName,
        newName,
        callback
      }
    });

    return self;
  };

  self.readFile = function (path, callback) {
    enqueueOperation({
      type: SharedFileSystemOperationType.ReadFile,
      payload: {
        path,
        callback
      }
    });

    return self;
  };

  self.readFileSize = function (path, callback) {
    enqueueOperation({
      type: SharedFileSystemOperationType.ReadFileSize,
      payload: {
        path,
        callback
      }
    });

    return self;
  };

  self.writeFile = function (dataStr, path, callback) {
    enqueueOperation({
      type: ExclusiveFileSystemOperationType.WriteFile,
      payload: {
        data: dataStr,
        path,
        callback
      }
    });

    return self;
  };

  self.appendFile = function (dataStr, path, callback) {
    enqueueOperation({
      type: ExclusiveFileSystemOperationType.AppendFile,
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

  // Module is ready!
  return self;
}
