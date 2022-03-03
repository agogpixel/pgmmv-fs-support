import type { BaseSharedFileOperation } from './base-shared-operation';
import type { ReadFileOperationPayload } from './read-file-payload';
import type { SharedFileOperationType } from './shared-type';

/**
 *
 */
export interface ReadFileOperation extends BaseSharedFileOperation<ReadFileOperationPayload> {
  /**
   *
   */
  type: SharedFileOperationType.Read;
}
