import type { BaseFileOperationPayload } from './base-payload';

/**
 *
 */
export interface RemoveDirectoryOperationPayload extends BaseFileOperationPayload {
  /**
   *
   */
  path: string;
}
