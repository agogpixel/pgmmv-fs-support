/**
 * Exports append file operation payload API.
 *
 * @module
 */
import type { BaseFileSystemOperationPayload } from '../base-file-system-operation-payload.interface';

/**
 * Append file operation payload API.
 */
export interface AppendFileOperationPayload extends BaseFileSystemOperationPayload {
  /**
   * Absolute file path.
   */
  path: string;

  /**
   * Data to append.
   */
  data: string;
}
