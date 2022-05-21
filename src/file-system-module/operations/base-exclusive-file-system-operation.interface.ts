/**
 * Exports base exclusive file system operation API.
 *
 * @module
 */
import type { ExclusiveFileSystemOperationPayloadUnion } from './exclusive-file-system-operation-payload-union.type';
import type { ExclusiveFileSystemOperationType } from './exclusive-file-system-operation-type.enum';

/**
 * Base exclusive file system operation API.
 */
export interface BaseExclusiveFileSystemOperation<T extends ExclusiveFileSystemOperationPayloadUnion> {
  /**
   * Exclusive file system operation type.
   */
  type: ExclusiveFileSystemOperationType;

  /**
   * Exclusive file system operation payload.
   */
  payload: T;
}
