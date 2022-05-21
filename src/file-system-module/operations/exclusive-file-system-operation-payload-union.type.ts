/**
 * Exports exclusive file system operation payload union type.
 *
 * @module
 */
import type { AppendFileOperationPayload } from './append-file';
import type { CreateDirectoryOperationPayload } from './create-directory';
import type { RemoveDirectoryOperationPayload } from './remove-directory';
import type { RemoveFileOperationPayload } from './remove-file';
import type { RenameFileOperationPayload } from './rename-file';
import type { WriteFileOperationPayload } from './write-file';

/**
 * Exclusive file system operation payload union type.
 */
export type ExclusiveFileSystemOperationPayloadUnion =
  | WriteFileOperationPayload
  | AppendFileOperationPayload
  | RenameFileOperationPayload
  | RemoveFileOperationPayload
  | CreateDirectoryOperationPayload
  | RemoveDirectoryOperationPayload;
