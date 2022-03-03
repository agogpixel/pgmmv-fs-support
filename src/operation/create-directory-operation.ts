import type { BaseExclusiveFileOperation } from './base-exclusive-operation';
import type { ExclusiveFileOperationType } from './exclusive-type';
import type { CreateDirectoryOperationPayload } from './create-directory-payload';

/**
 *
 */
export interface CreateDirectoryOperation extends BaseExclusiveFileOperation<CreateDirectoryOperationPayload> {
  /**
   *
   */
  type: ExclusiveFileOperationType.CreateDirectory;
}
