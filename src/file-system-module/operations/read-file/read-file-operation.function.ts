/**
 * Exports read file operation function.
 *
 * @module
 */
import type { ReleaseLock } from '@agogpixel/pgmmv-resource-support/src/locks/release-lock.type';

import type { ReadFileOperationPayload } from './read-file-operation-payload.interface';

/**
 * Read file operation.
 *
 * @param payload Operation payload.
 * @param releaseLock Release lock callback.
 */
export function readFileOperation(payload: ReadFileOperationPayload, releaseLock: ReleaseLock) {
  const path = payload.path;
  const callback = payload.callback;

  const result = jsb.fileUtils.getStringFromFile(path);

  releaseLock();

  if (typeof result !== 'string') {
    callback(false, `Read operation of '${path}' failed immediately`);
    return;
  }

  callback(true, result);
}
