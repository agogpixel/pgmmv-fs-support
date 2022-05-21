/**
 * Exports file reader mixin function.
 *
 * @module
 */
import type { FileReader } from './file-reader.interface';
import { createFileSystemModule as getFileSystem } from './file-system-module';

/**
 * File reader mixin.
 *
 * @param subject Mixin subject.
 * @returns Reference to mixin subject.
 */
export function mixinFileReader<T extends object>(subject: T) {
  const self = subject as T & FileReader;

  self.readFileSize = function (path, callback) {
    const fs = getFileSystem();

    if (fs) {
      fs.readFileSize(path, callback);
    } else {
      callback(false, 'File system module not found');
    }

    return self;
  };

  self.readFile = function (path, callback) {
    const fs = getFileSystem();

    if (fs) {
      fs.readFile(path, callback);
    } else {
      callback(false, 'File system module not found');
    }

    return self;
  };

  return self;
}
