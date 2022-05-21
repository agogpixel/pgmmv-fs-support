/**
 * Exports append file operation API.
 *
 * @module
 */
import type { BaseExclusiveFileSystemOperation } from '../base-exclusive-file-system-operation.interface';
import type { ExclusiveFileSystemOperationType } from '../exclusive-file-system-operation-type.enum';

import type { AppendFileOperationPayload } from './append-file-operation-payload.interface';

/**
 * Append file operation API.
 */
export interface AppendFileOperation extends BaseExclusiveFileSystemOperation<AppendFileOperationPayload> {
  /**
   * Append file operation type.
   */
  type: ExclusiveFileSystemOperationType.AppendFile;
}
