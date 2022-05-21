/**
 * Exports file writer mixin function.
 *
 * @module
 */
import { createFileSystemModule as getFileSystem } from './file-system-module';
import type { FileWriter } from './file-writer.interface';

/**
 * File writer mixin.
 *
 * @param subject Mixin subject.
 * @returns Reference to mixin subject.
 */
export function mixinFileWriter<T extends object>(subject: T) {
  const self = subject as T & FileWriter;

  self.appendFile = function (dataStr, path, callback) {
    const fs = getFileSystem();

    if (fs) {
      fs.appendFile(dataStr, path, callback);
    } else {
      callback(false, 'File system module not found');
    }

    return self;
  };

  self.writeFile = function (dataStr, path, callback) {
    const fs = getFileSystem();

    if (fs) {
      fs.writeFile(dataStr, path, callback);
    } else {
      callback(false, 'File system module not found');
    }

    return self;
  };

  return self;
}
