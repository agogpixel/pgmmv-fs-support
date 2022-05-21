/**
 * Exports create directory operation API.
 *
 * @module
 */
import type { BaseExclusiveFileSystemOperation } from '../base-exclusive-file-system-operation.interface';
import type { ExclusiveFileSystemOperationType } from '../exclusive-file-system-operation-type.enum';

import type { CreateDirectoryOperationPayload } from './create-directory-operation-payload.interface';

/**
 * Create directory operation API.
 */
export interface CreateDirectoryOperation extends BaseExclusiveFileSystemOperation<CreateDirectoryOperationPayload> {
  /**
   * Create directory operation type.
   */
  type: ExclusiveFileSystemOperationType.CreateDirectory;
}
