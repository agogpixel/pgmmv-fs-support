/**
 * Exports remove directory operation function.
 *
 * @module
 */
import type { ReleaseLock } from '@agogpixel/pgmmv-resource-support/src/locks/release-lock.type';
import { pollWithBackoff } from '@agogpixel/pgmmv-resource-support/src/time/poll-with-backoff.function';

import type { RemoveDirectoryOperationPayload } from './remove-directory-operation-payload.interface';

/**
 * Remove directory operation.
 *
 * @param payload Operation payload.
 * @param releaseLock Release lock callback.
 */
export function removeDirectoryOperation(payload: RemoveDirectoryOperationPayload, releaseLock: ReleaseLock) {
  const path = payload.path;
  const callback = payload.callback;

  function conditional() {
    return !jsb.fileUtils.isDirectoryExist(path);
  }

  function onProceed() {
    releaseLock();
    callback(true);
  }

  function onTimeout(elapsed: number) {
    releaseLock();
    callback(false, `Remove operation of '${path}' timed out after ${elapsed / 1000}s`);
  }

  const result = jsb.fileUtils.removeDirectory(path);

  if (!result) {
    releaseLock();
    callback(false, `Remove operation of '${path}' failed immediately`);
    return;
  }

  pollWithBackoff(conditional, onProceed, onTimeout, 1000, 5);
}
