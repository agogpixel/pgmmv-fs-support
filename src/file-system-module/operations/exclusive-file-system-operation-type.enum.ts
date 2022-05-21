/**
 * Exports exclusive file system operation type enumeration.
 *
 * @module
 */

/**
 * Exclusive file system operation type enumeration.
 */
export enum ExclusiveFileSystemOperationType {
  /**
   * Write file.
   */
  WriteFile,

  /**
   * Append file.
   */
  AppendFile,

  /**
   * Rename file.
   */
  RenameFile,

  /**
   * Remove file.
   */
  RemoveFile,

  /**
   * Create directory.
   */
  CreateDirectory,

  /**
   * Remove directory.
   */
  RemoveDirectory
}
