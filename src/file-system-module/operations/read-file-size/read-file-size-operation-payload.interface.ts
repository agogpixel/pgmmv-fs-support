/**
 * Exports read file size operation payload API.
 *
 * @module
 */
import type { BaseFileSystemOperationPayload } from '../base-file-system-operation-payload.interface';

/**
 * Read file size operation payload API.
 */
export interface ReadFileSizeOperationPayload extends BaseFileSystemOperationPayload {
  /**
   * Absolute path.
   */
  path: string;
}
