/**
 * Exports file writer API.
 *
 * @module
 */
import type { FileSystemOperationCallback } from './file-system-module';

/**
 * File writer API.
 */
export interface FileWriter {
  /**
   * Append file.
   *
   * @param dataStr Data to append.
   * @param path This must be an absolute path.
   * @param callback File system operation callback.
   * @returns Reference to file writer for further method chaining.
   */
  appendFile(dataStr: string, path: string, callback: FileSystemOperationCallback): this;

  /**
   * Write file.
   *
   * @param dataStr Data to write.
   * @param path This must be an absolute path.
   * @param callback File system operation callback.
   * @returns Reference to file writer for further method chaining.
   */
  writeFile(dataStr: string, path: string, callback: FileSystemOperationCallback): this;
}
