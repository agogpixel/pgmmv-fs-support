/**
 * Exports write file operation API.
 *
 * @module
 */
import type { BaseExclusiveFileSystemOperation } from '../base-exclusive-file-system-operation.interface';
import type { ExclusiveFileSystemOperationType } from '../exclusive-file-system-operation-type.enum';

import type { WriteFileOperationPayload } from './write-file-operation-payload.interface';

/**
 * Write file operation API.
 */
export interface WriteFileOperation extends BaseExclusiveFileSystemOperation<WriteFileOperationPayload> {
  /**
   * Write file operation type.
   */
  type: ExclusiveFileSystemOperationType.WriteFile;
}
