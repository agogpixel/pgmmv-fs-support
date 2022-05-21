/**
 * Exports read file size operation function.
 *
 * @module
 */
import type { ReleaseLock } from '@agogpixel/pgmmv-resource-support/src/locks/release-lock.type';

import type { ReadFileSizeOperationPayload } from './read-file-size-operation-payload.interface';

/**
 * Read file size operation.
 *
 * @param payload Operation payload.
 * @param releaseLock Release lock callback.
 */
export function readFileSizeOperation(payload: ReadFileSizeOperationPayload, releaseLock: ReleaseLock) {
  const path = payload.path;
  const callback = payload.callback;

  const result = jsb.fileUtils.getFileSize(path);

  releaseLock();

  if (typeof result !== 'number') {
    callback(false, `Read size operation of '${path}' failed immediately`);
    return;
  }

  callback(true, result);
}
