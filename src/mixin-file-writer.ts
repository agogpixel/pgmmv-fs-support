import { createFileSystemModule as getFileSystem } from './create-file-system-module';
import type { FileWriter } from './file-writer';

/**
 *
 * @param subject
 * @returns
 */
export function mixinFileWriter<T extends object>(subject: T) {
  const self = subject as T & FileWriter;

  /**
   *
   * @param dataStr
   * @param path
   * @param callback
   * @returns
   */
  self.writeFile = function writeFile(dataStr, path, callback) {
    const fs = getFileSystem();

    if (fs) {
      fs.writeFile(dataStr, path, callback);
    } else {
      callback(false, 'File system module not found');
    }

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
    const fs = getFileSystem();

    if (fs) {
      fs.appendFile(dataStr, path, callback);
    } else {
      callback(false, 'File system module not found');
    }

    return self;
  };

  return self;
}
