/**
 * Exports read file operation API.
 *
 * @module
 */
import type { BaseSharedFileSystemOperation } from '../base-shared-file-system-operation.interface';
import type { SharedFileSystemOperationType } from '../shared-file-system-operation-type.enum';

import type { ReadFileOperationPayload } from './read-file-operation-payload.interface';

/**
 * Read file operation API.
 */
export interface ReadFileOperation extends BaseSharedFileSystemOperation<ReadFileOperationPayload> {
  /**
   * Read file operation type.
   */
  type: SharedFileSystemOperationType.ReadFile;
}
