/**
 * Exports remove directory operation API.
 *
 * @module
 */
import type { BaseExclusiveFileSystemOperation } from '../base-exclusive-file-system-operation.interface';
import type { ExclusiveFileSystemOperationType } from '../exclusive-file-system-operation-type.enum';

import type { RemoveDirectoryOperationPayload } from './remove-directory-operation-payload.interface';

/**
 * Remove directory operation API.
 */
export interface RemoveDirectoryOperation extends BaseExclusiveFileSystemOperation<RemoveDirectoryOperationPayload> {
  /**
   * Remove directory operation type.
   */
  type: ExclusiveFileSystemOperationType.RemoveDirectory;
}
