import type { FileSystemOperationCallback } from './operation/callback';

/**
 *
 */
export interface FileWriter {
  /**
   *
   * @param dataStr
   * @param path
   * @param callback
   */
  writeFile(dataStr: string, path: string, callback: FileSystemOperationCallback): this;

  /**
   *
   * @param dataStr
   * @param path
   * @param callback
   */
  appendFile(dataStr: string, path: string, callback: FileSystemOperationCallback): this;
}
