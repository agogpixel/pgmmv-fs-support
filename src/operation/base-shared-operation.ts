import type { SharedFileOperationPayload } from './shared-payload';
import type { SharedFileOperationType } from './shared-type';

/**
 *
 */
export interface BaseSharedFileOperation<T extends SharedFileOperationPayload> {
  /**
   *
   */
  type: SharedFileOperationType;

  /**
   *
   */
  payload: T;
}
