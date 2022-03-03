import type { FileSystemOperationCallback } from './operation/callback';

/**
 *
 */
export interface FileManager {
  /**
   *
   * @param path
   * @param callback
   */
  createDirectory(path: string, callback: FileSystemOperationCallback): this;

  /**
   *
   * @param path
   */
  isAbsolutePath(path: string): boolean;

  /**
   *
   * @param path
   */
  isDirectory(path: string): boolean;

  /**
   *
   * @param path
   */
  isFile(path: string): boolean;

  /**
   *
   * @param path
   * @param callback
   */
  removeDirectory(path: string, callback: FileSystemOperationCallback): this;

  /**
   *
   * @param path
   * @param callback
   */
  removeFile(path: string, callback: FileSystemOperationCallback): this;

  /**
   *
   * @param dirPath
   * @param oldName
   * @param newName
   * @param callback
   */
  renameFile(dirPath: string, oldName: string, newName: string, callback: FileSystemOperationCallback): this;
}
