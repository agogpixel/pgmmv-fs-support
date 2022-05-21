/**
 * Exports create director operation function.
 *
 * @module
 */
import type { ReleaseLock } from '@agogpixel/pgmmv-resource-support/src/locks/release-lock.type';
import { pollWithBackoff } from '@agogpixel/pgmmv-resource-support/src/time/poll-with-backoff.function';

import type { CreateDirectoryOperationPayload } from './create-directory-operation-payload.interface';

/**
 * Create directory operation.
 *
 * @param payload Operation payload.
 * @param releaseLock Release lock callback.
 */
export function createDirectoryOperation(payload: CreateDirectoryOperationPayload, releaseLock: ReleaseLock) {
  const path = payload.path;
  const callback = payload.callback;

  function conditional() {
    return jsb.fileUtils.isDirectoryExist(path);
  }

  function onProceed() {
    releaseLock();
    callback(true);
  }

  function onTimeout(elapsed: number) {
    releaseLock();
    callback(false, `Create operation of '${path}' timed out after ${elapsed / 1000}s`);
  }

  const result = jsb.fileUtils.createDirectory(path);

  if (!result) {
    releaseLock();
    callback(false, `Create operation of '${path}' failed immediately`);
    return;
  }

  pollWithBackoff(conditional, onProceed, onTimeout, 1000, 5);
}
