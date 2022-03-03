import type { BaseFileOperationPayload } from './base-payload';

/**
 *
 */
export interface ReadFileOperationPayload extends BaseFileOperationPayload {
  /**
   *
   */
  path: string;
}
