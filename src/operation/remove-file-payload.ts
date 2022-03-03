import type { BaseFileOperationPayload } from './base-payload';

/**
 *
 */
export interface RemoveFileOperationPayload extends BaseFileOperationPayload {
  /**
   *
   */
  path: string;
}
