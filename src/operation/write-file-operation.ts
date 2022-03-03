import type { BaseExclusiveFileOperation } from './base-exclusive-operation';
import type { ExclusiveFileOperationType } from './exclusive-type';
import type { WriteFileOperationPayload } from './write-file-payload';

/**
 *
 */
export interface WriteFileOperation extends BaseExclusiveFileOperation<WriteFileOperationPayload> {
  /**
   *
   */
  type: ExclusiveFileOperationType.Write;
}
