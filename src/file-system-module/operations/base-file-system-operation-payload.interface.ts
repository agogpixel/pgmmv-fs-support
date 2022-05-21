/**
 * Exports base file system operation payload API.
 *
 * @module
 */
import type { FileSystemOperationCallback } from './file-system-operation-callback.type';

/**
 * Base file system operation payload API.
 */
export interface BaseFileSystemOperationPayload {
  /**
   * File system operation callback.
   */
  callback: FileSystemOperationCallback;
}
