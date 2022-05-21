/**
 * Exports read file size operation API.
 *
 * @module
 */
import type { BaseSharedFileSystemOperation } from '../base-shared-file-system-operation.interface';
import type { SharedFileSystemOperationType } from '../shared-file-system-operation-type.enum';

import type { ReadFileSizeOperationPayload } from './read-file-size-operation-payload.interface';

/**
 * Read file size operation API.
 */
export interface ReadFileSizeOperation extends BaseSharedFileSystemOperation<ReadFileSizeOperationPayload> {
  /**
   * Read file size operation type.
   */
  type: SharedFileSystemOperationType.ReadFileSize;
}
