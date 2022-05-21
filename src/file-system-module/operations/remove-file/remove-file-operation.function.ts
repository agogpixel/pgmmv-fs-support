/**
 * Exports remove file operation function.
 *
 * @module
 */
import type { ReleaseLock } from '@agogpixel/pgmmv-resource-support/src/locks/release-lock.type';
import { pollWithBackoff } from '@agogpixel/pgmmv-resource-support/src/time/poll-with-backoff.function';

import type { RemoveFileOperationPayload } from './remove-file-operation-payload.interface';

/**
 * Remove file operation.
 *
 * @param payload Operation payload.
 * @param releaseLock Release lock callback.
 */
export function removeFileOperation(payload: RemoveFileOperationPayload, releaseLock: ReleaseLock) {
  const path = payload.path;
  const callback = payload.callback;

  function conditional() {
    return !jsb.fileUtils.isFileExist(path);
  }

  function onProceed() {
    releaseLock();
    callback(true);
  }

  function onTimeout(elapsed: number) {
    releaseLock();
    callback(false, `Remove operation of '${path}' timed out after ${elapsed / 1000}s`);
  }

  const result = jsb.fileUtils.removeFile(path);

  if (!result) {
    releaseLock();
    callback(false, `Remove operation of '${path}' failed immediately`);
    return;
  }

  pollWithBackoff(conditional, onProceed, onTimeout, 1000, 5);
}
