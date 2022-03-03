import type { BaseSharedFileOperation } from './base-shared-operation';
import type { ReadSizeFileOperationPayload } from './read-size-file-payload';
import type { SharedFileOperationType } from './shared-type';

/**
 *
 */
export interface ReadSizeFileOperation extends BaseSharedFileOperation<ReadSizeFileOperationPayload> {
  /**
   *
   */
  type: SharedFileOperationType.ReadSize;
}
