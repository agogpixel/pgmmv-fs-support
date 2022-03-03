import type { AppendFileOperationPayload } from './append-file-payload';
import type { CreateDirectoryOperationPayload } from './create-directory-payload';
import type { RemoveDirectoryOperationPayload } from './remove-directory-payload';
import type { RemoveFileOperationPayload } from './remove-file-payload';
import type { RenameFileOperationPayload } from './rename-file-payload';
import type { WriteFileOperationPayload } from './write-file-payload';

/**
 *
 */
export type ExclusiveFileOperationPayload =
  | WriteFileOperationPayload
  | AppendFileOperationPayload
  | RenameFileOperationPayload
  | RemoveFileOperationPayload
  | CreateDirectoryOperationPayload
  | RemoveDirectoryOperationPayload;
