/**
 * Exports read file operation payload API.
 *
 * @module
 */
import type { BaseFileSystemOperationPayload } from '../base-file-system-operation-payload.interface';

/**
 * Read file operation payload API.
 */
export interface ReadFileOperationPayload extends BaseFileSystemOperationPayload {
  /**
   * Absolute path.
   */
  path: string;
}
