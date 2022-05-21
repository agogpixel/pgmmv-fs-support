/**
 * Exports rename file operation payload API.
 *
 * @module
 */
import type { BaseFileSystemOperationPayload } from '../base-file-system-operation-payload.interface';

/**
 * Rename file operation payload API.
 */
export interface RenameFileOperationPayload extends BaseFileSystemOperationPayload {
  /**
   * Absolute path of containing directory.
   */
  dirPath: string;

  /**
   * Old filename.
   */
  oldName: string;

  /**
   * New filename.
   */
  newName: string;
}
