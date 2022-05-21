/**
 * Exports remove directory operation payload API.
 *
 * @module
 */
import type { BaseFileSystemOperationPayload } from '../base-file-system-operation-payload.interface';

/**
 * Remove directory operation payload API.
 */
export interface RemoveDirectoryOperationPayload extends BaseFileSystemOperationPayload {
  /**
   * Absolute path.
   */
  path: string;
}
