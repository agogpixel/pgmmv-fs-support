/**
 * Exports remove file operation API.
 *
 * @module
 */
import type { BaseExclusiveFileSystemOperation } from '../base-exclusive-file-system-operation.interface';
import type { ExclusiveFileSystemOperationType } from '../exclusive-file-system-operation-type.enum';
import type { RemoveFileOperationPayload } from './remove-file-operation-payload.interface';

/**
 * Remove file operation API.
 */
export interface RemoveFileOperation extends BaseExclusiveFileSystemOperation<RemoveFileOperationPayload> {
  /**
   * Remove file operation type.
   */
  type: ExclusiveFileSystemOperationType.RemoveFile;
}
