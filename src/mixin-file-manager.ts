import { createFileSystemModule as getFileSystem } from './create-file-system-module';
import type { FileManager } from './file-manager';

/**
 *
 * @param subject
 * @returns
 */
export function mixinFileManager<T extends object>(subject: T) {
  /**
   *
   */
  const self = subject as T & FileManager;

  /**
   *
   * @param path
   * @param callback
   * @returns
   */
  self.createDirectory = function createDirectory(path, callback) {
    const fs = getFileSystem();

    if (fs) {
      fs.createDirectory(path, callback);
    } else {
      callback(false, 'File system module not found');
    }

    return self;
  };

  /**
   *
   * @param path
   * @returns
   */
  self.isAbsolutePath = function isAbsolutePath(path) {
    const fs = getFileSystem();

    if (fs) {
      return fs.isAbsolutePath(path);
    }

    return false;
  };

  /**
   *
   * @param path
   * @returns
   */
  self.isDirectory = function isDirectory(path) {
    const fs = getFileSystem();

    if (fs) {
      return fs.isDirectory(path);
    }

    return false;
  };

  /**
   *
   * @param path
   * @returns
   */
  self.isFile = function isFile(path) {
    const fs = getFileSystem();

    if (fs) {
      return fs.isFile(path);
    }

    return false;
  };

  /**
   *
   * @param path
   * @param callback
   * @returns
   */
  self.removeDirectory = function removeDirectory(path, callback) {
    const fs = getFileSystem();

    if (fs) {
      fs.removeDirectory(path, callback);
    } else {
      callback(false, 'File system module not found');
    }

    return self;
  };

  /**
   *
   * @param path
   * @param callback
   * @returns
   */
  self.removeFile = function removeFile(path, callback) {
    const fs = getFileSystem();

    if (fs) {
      fs.removeFile(path, callback);
    } else {
      callback(false, 'File system module not found');
    }

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
    const fs = getFileSystem();

    if (fs) {
      fs.renameFile(dirPath, oldName, newName, callback);
    } else {
      callback(false, 'File system module not found');
    }

    return self;
  };

  return self;
}
