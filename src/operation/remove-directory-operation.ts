import type { BaseExclusiveFileOperation } from './base-exclusive-operation';
import type { ExclusiveFileOperationType } from './exclusive-type';
import type { RemoveDirectoryOperationPayload } from './remove-directory-payload';

/**
 *
 */
export interface RemoveDirectoryOperation extends BaseExclusiveFileOperation<RemoveDirectoryOperationPayload> {
  /**
   *
   */
  type: ExclusiveFileOperationType.RemoveDirectory;
}
