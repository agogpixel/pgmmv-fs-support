/**
 * Exports shared file system operation union type.
 *
 * @module
 */
import type { ReadFileOperation } from './read-file';
import type { ReadFileSizeOperation } from './read-file-size';

/**
 * Shared file system operation union type.
 */
export type SharedFileSystemOperationUnion = ReadFileOperation | ReadFileSizeOperation;
