import type { BaseFileOperationPayload } from './base-payload';

/**
 *
 */
export interface WriteFileOperationPayload extends BaseFileOperationPayload {
  /**
   *
   */
  path: string;

  /**
   *
   */
  data: string;
}
