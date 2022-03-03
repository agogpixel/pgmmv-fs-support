import type { BaseFileOperationPayload } from './base-payload';

/**
 *
 */
export interface RenameFileOperationPayload extends BaseFileOperationPayload {
  /**
   *
   */
  dirPath: string;

  /**
   *
   */
  oldName: string;

  /**
   *
   */
  newName: string;
}
