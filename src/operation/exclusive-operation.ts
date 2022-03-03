import type { AppendFileOperation } from './append-file-operation';
import type { CreateDirectoryOperation } from './create-directory-operation';
import type { RemoveDirectoryOperation } from './remove-directory-operation';
import type { RemoveFileOperation } from './remove-file-operation';
import type { RenameFileOperation } from './rename-file-operation';
import type { WriteFileOperation } from './write-file-operation';

/**
 *
 */
export type ExclusiveFileOperation =
  | WriteFileOperation
  | AppendFileOperation
  | RemoveFileOperation
  | RenameFileOperation
  | CreateDirectoryOperation
  | RemoveDirectoryOperation;
