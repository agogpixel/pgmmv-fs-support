import { createFileSystemModule as getFileSystem } from './create-file-system-module';
import type { FileReader } from './file-reader';

/**
 *
 * @param subject
 * @returns
 */
export function mixinFileReader<T extends object>(subject: T) {
  /**
   *
   */
  const self = subject as T & FileReader;

  /**
   *
   * @param path
   * @param callback
   * @returns
   */
  self.readFileSize = function readFileSize(path, callback) {
    const fs = getFileSystem();

    if (fs) {
      fs.readFileSize(path, callback);
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
  self.readFile = function readFile(path, callback) {
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
