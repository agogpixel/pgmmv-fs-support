/**
 * Exports exclusive file system operation union type.
 *
 * @module
 */
import type { AppendFileOperation } from './append-file';
import type { CreateDirectoryOperation } from './create-directory';
import type { RemoveDirectoryOperation } from './remove-directory';
import type { RemoveFileOperation } from './remove-file';
import type { RenameFileOperation } from './rename-file';
import type { WriteFileOperation } from './write-file';

/**
 * Exclusive file system operation union type.
 */
export type ExclusiveFileSystemOperationUnion =
  | WriteFileOperation
  | AppendFileOperation
  | RemoveFileOperation
  | RenameFileOperation
  | CreateDirectoryOperation
  | RemoveDirectoryOperation;
