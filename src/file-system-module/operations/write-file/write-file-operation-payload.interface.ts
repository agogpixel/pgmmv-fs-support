/**
 * Exports write file operation payload API.
 *
 * @module
 */
import type { BaseFileSystemOperationPayload } from '../base-file-system-operation-payload.interface';

/**
 * Write file operation payload API.
 */
export interface WriteFileOperationPayload extends BaseFileSystemOperationPayload {
  /**
   * Absoulte file path.
   */
  path: string;

  /**
   * Data to write.
   */
  data: string;
}
