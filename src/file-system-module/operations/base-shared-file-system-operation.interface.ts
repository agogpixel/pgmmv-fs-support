/**
 * Exports base shared file system operation API.
 *
 * @module
 */
import type { SharedFileSystemOperationPayloadUnion } from './shared-file-system-operation-payload-union.type';
import type { SharedFileSystemOperationType } from './shared-file-system-operation-type.enum';

/**
 * Base shared file system operation API.
 */
export interface BaseSharedFileSystemOperation<T extends SharedFileSystemOperationPayloadUnion> {
  /**
   * Shared file system operation type.
   */
  type: SharedFileSystemOperationType;

  /**
   * Shared file system operation payload.
   */
  payload: T;
}
