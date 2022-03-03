import type { BaseExclusiveFileOperation } from './base-exclusive-operation';
import type { ExclusiveFileOperationType } from './exclusive-type';
import type { RenameFileOperationPayload } from './rename-file-payload';

/**
 *
 */
export interface RenameFileOperation extends BaseExclusiveFileOperation<RenameFileOperationPayload> {
  /**
   *
   */
  type: ExclusiveFileOperationType.Rename;
}
