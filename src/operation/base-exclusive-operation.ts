import type { ExclusiveFileOperationPayload } from './exclusive-payload';
import type { ExclusiveFileOperationType } from './exclusive-type';

/**
 *
 */
export interface BaseExclusiveFileOperation<T extends ExclusiveFileOperationPayload> {
  /**
   *
   */
  type: ExclusiveFileOperationType;

  /**
   *
   */
  payload: T;
}
