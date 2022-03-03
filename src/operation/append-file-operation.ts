import type { BaseExclusiveFileOperation } from './base-exclusive-operation';
import type { ExclusiveFileOperationType } from './exclusive-type';
import type { AppendFileOperationPayload } from './append-file-payload';

/**
 *
 */
export interface AppendFileOperation extends BaseExclusiveFileOperation<AppendFileOperationPayload> {
  /**
   *
   */
  type: ExclusiveFileOperationType.Append;
}
