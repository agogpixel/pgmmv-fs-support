import type { BaseFileOperationPayload } from './base-payload';

/**
 *
 */
export interface CreateDirectoryOperationPayload extends BaseFileOperationPayload {
  /**
   *
   */
  path: string;
}
