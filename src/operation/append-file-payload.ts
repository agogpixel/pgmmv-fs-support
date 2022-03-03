import type { BaseFileOperationPayload } from './base-payload';

/**
 *
 */
export interface AppendFileOperationPayload extends BaseFileOperationPayload {
  /**
   *
   */
  path: string;

  /**
   *
   */
  data: string;
}
