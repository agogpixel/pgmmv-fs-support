import type { ReadFileOperationPayload } from './read-file-payload';
import type { ReadSizeFileOperationPayload } from './read-size-file-payload';

/**
 *
 */
export type SharedFileOperationPayload = ReadFileOperationPayload | ReadSizeFileOperationPayload;
