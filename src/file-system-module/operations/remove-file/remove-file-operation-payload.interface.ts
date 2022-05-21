/**
 * Exports remove file operation payload API.
 *
 * @module
 */
import type { BaseFileSystemOperationPayload } from '../base-file-system-operation-payload.interface';

/**
 * Remove file operation payload API.
 */
export interface RemoveFileOperationPayload extends BaseFileSystemOperationPayload {
  /**
   * Absolute path.
   */
  path: string;
}
