/**
 * Exports rename file operation function.
 *
 * @module
 */
import type { ReleaseLock } from '@agogpixel/pgmmv-resource-support/src/locks/release-lock.type';
import { pollWithBackoff } from '@agogpixel/pgmmv-resource-support/src/time/poll-with-backoff.function';

import type { RenameFileOperationPayload } from './rename-file-operation-payload.interface';

/**
 * Rename file operation.
 *
 * @param payload Operation payload.
 * @param releaseLock Release lock callback.
 */
export function renameFileOperation(payload: RenameFileOperationPayload, releaseLock: ReleaseLock) {
  const dirPath = payload.dirPath;
  const oldName = payload.oldName;
  const newName = payload.newName;
  const callback = payload.callback;

  const path = `${dirPath}/${oldName}`;
  const newPath = `${dirPath}/${newName}`;

  function conditional() {
    return jsb.fileUtils.isFileExist(newPath);
  }

  function onProceed() {
    releaseLock();
    callback(true);
  }

  function onTimeout(elapsed: number) {
    releaseLock();
    callback(false, `Rename operation of '${path}' to '${newPath}' timed out after ${elapsed / 1000}s`);
  }

  const result = jsb.fileUtils.renameFile(dirPath, oldName, newName);

  if (!result) {
    releaseLock();
    callback(false, `Rename operation of '${path}' to '${newPath}' failed immediately`);
    return;
  }

  pollWithBackoff(conditional, onProceed, onTimeout, 1000, 5);
}
