import type { ReadFileOperation } from './read-file-operation';
import type { ReadSizeFileOperation } from './read-size-file-operation';

/**
 *
 */
export type SharedFileOperation = ReadFileOperation | ReadSizeFileOperation;
