/**
 * Exports file reader API.
 *
 * @module
 */
import type { FileSystemOperationCallback } from './file-system-module';

/**
 * File reader API.
 */
export interface FileReader {
  /**
   * Read file size.
   *
   * @param path Path to file.
   * @param callback File system operation callback.
   * @returns Reference to file reader for further method chaining.
   */
  readFileSize(path: string, callback: FileSystemOperationCallback): this;

  /**
   * Read file.
   *
   * @param path Path to file.
   * @param callback File system operation callback.
   * @returns Reference to file reader for further method chaining.
   */
  readFile(path: string, callback: FileSystemOperationCallback): this;
}
