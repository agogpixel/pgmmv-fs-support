/**
 * Exports shared file system operation payload union type.
 *
 * @module
 */
import type { ReadFileOperationPayload } from './read-file';
import type { ReadFileSizeOperationPayload } from './read-file-size';

/**
 * Shared file system operation payload union type.
 */
export type SharedFileSystemOperationPayloadUnion = ReadFileOperationPayload | ReadFileSizeOperationPayload;
