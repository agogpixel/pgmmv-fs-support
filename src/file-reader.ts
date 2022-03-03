import type { FileSystemOperationCallback } from './operation/callback';

/**
 *
 */
export interface FileReader {
  /**
   *
   * @param path
   * @param callback
   */
  readFileSize(path: string, callback: FileSystemOperationCallback): this;

  /**
   *
   * @param path
   * @param callback
   */
  readFile(path: string, callback: FileSystemOperationCallback): this;
}
