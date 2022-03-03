import type { ExclusiveFileOperation } from './exclusive-operation';
import type { SharedFileOperation } from './shared-operation';

/**
 *
 */
export type FileOperation = ExclusiveFileOperation | SharedFileOperation;
