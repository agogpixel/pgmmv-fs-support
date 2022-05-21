/**
 * Exports file manager mixin function.
 *
 * @module
 */
import type { FileManager } from './file-manager.interface';
import { createFileSystemModule as getFileSystem } from './file-system-module';

/**
 * File manager mixin.
 *
 * @param subject Mixin subject.
 * @returns Reference to mixin subject.
 */
export function mixinFileManager<T extends object>(subject: T) {
  const self = subject as T & FileManager;

  self.createDirectory = function (path, callback) {
    const fs = getFileSystem();

    if (fs) {
      fs.createDirectory(path, callback);
    } else {
      callback(false, 'File system module not found');
    }

    return self;
  };

  self.isAbsolutePath = function (path) {
    const fs = getFileSystem();

    if (fs) {
      return fs.isAbsolutePath(path);
    }

    return false;
  };

  self.isDirectory = function (path) {
    const fs = getFileSystem();

    if (fs) {
      return fs.isDirectory(path);
    }

    return false;
  };

  self.isFile = function (path) {
    const fs = getFileSystem();

    if (fs) {
      return fs.isFile(path);
    }

    return false;
  };

  self.removeDirectory = function (path, callback) {
    const fs = getFileSystem();

    if (fs) {
      fs.removeDirectory(path, callback);
    } else {
      callback(false, 'File system module not found');
    }

    return self;
  };

  self.removeFile = function (path, callback) {
    const fs = getFileSystem();

    if (fs) {
      fs.removeFile(path, callback);
    } else {
      callback(false, 'File system module not found');
    }

    return self;
  };

  self.renameFile = function (dirPath, oldName, newName, callback) {
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
