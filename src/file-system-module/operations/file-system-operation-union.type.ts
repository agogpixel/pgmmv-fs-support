/**
 * Exports file system operation union type.
 *
 * @module
 */
import type { ExclusiveFileSystemOperationUnion } from './exclusive-file-system-operation-union.type';
import type { SharedFileSystemOperationUnion } from './shared-file-system-operation-union.type';

/**
 * File system operation union type.
 */
export type FileSystemOperationUnion = ExclusiveFileSystemOperationUnion | SharedFileSystemOperationUnion;
