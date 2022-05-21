/**
 * Exports file manager API.
 *
 * @module
 */
import type { FileSystemOperationCallback } from './file-system-module';

/**
 * File manager API.
 */
export interface FileManager {
  /**
   * Create directory.
   *
   * @param path This must be an absolute path.
   * @param callback File system operation callback.
   * @returns Reference to file manager for further method chaining.
   */
  createDirectory(path: string, callback: FileSystemOperationCallback): this;

  /**
   * Test if absolute path.
   *
   * @param path The path to test.
   * @returns True when path is absolute, false otherwise.
   */
  isAbsolutePath(path: string): boolean;

  /**
   * Test if directory.
   *
   * @param path The path to test.
   * @returns True when path is a directory, false otherwise.
   */
  isDirectory(path: string): boolean;

  /**
   * Test if file.
   *
   * @param path The path to test.
   * @returns True when path is a file, false otherwise.
   */
  isFile(path: string): boolean;

  /**
   * Remove directory.
   *
   * @param path This must be an absolute path.
   * @param callback File system operation callback.
   * @returns Reference to file manager for further method chaining.
   */
  removeDirectory(path: string, callback: FileSystemOperationCallback): this;

  /**
   * Remove file.
   *
   * @param path This must be an absolute path.
   * @param callback File system operation callback.
   * @returns Reference to file manager for further method chaining.
   */
  removeFile(path: string, callback: FileSystemOperationCallback): this;

  /**
   * Rename file.
   *
   * @param dirPath Containing directory. This must be an absolute path.
   * @param oldName Old filename.
   * @param newName New filename.
   * @param callback File system operation callback.
   * @returns Reference to file manager for further method chaining.
   */
  renameFile(dirPath: string, oldName: string, newName: string, callback: FileSystemOperationCallback): this;
}
