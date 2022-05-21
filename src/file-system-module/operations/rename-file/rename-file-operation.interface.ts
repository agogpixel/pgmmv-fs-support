/**
 * Exports rename file operation API.
 *
 * @module
 */
import type { BaseExclusiveFileSystemOperation } from '../base-exclusive-file-system-operation.interface';
import type { ExclusiveFileSystemOperationType } from '../exclusive-file-system-operation-type.enum';

import type { RenameFileOperationPayload } from './rename-file-operation-payload.interface';

/**
 * Rename file operation API.
 */
export interface RenameFileOperation extends BaseExclusiveFileSystemOperation<RenameFileOperationPayload> {
  /**
   * Rename file operation type.
   */
  type: ExclusiveFileSystemOperationType.RenameFile;
}
