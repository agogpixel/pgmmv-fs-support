import type { BaseExclusiveFileOperation } from './base-exclusive-operation';
import type { ExclusiveFileOperationType } from './exclusive-type';
import type { RemoveFileOperationPayload } from './remove-file-payload';

/**
 *
 */
export interface RemoveFileOperation extends BaseExclusiveFileOperation<RemoveFileOperationPayload> {
  /**
   *
   */
  type: ExclusiveFileOperationType.Remove;
}
