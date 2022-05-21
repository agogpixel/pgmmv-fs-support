/**
 * Exports create directory operation payload API.
 *
 * @module
 */
import type { BaseFileSystemOperationPayload } from '../base-file-system-operation-payload.interface';

/**
 * Create directory operation payload API.
 */
export interface CreateDirectoryOperationPayload extends BaseFileSystemOperationPayload {
  /**
   * Absolute path.
   */
  path: string;
}
