/**
 * Exports append file operation function.
 *
 * @module
 */
import type { ReleaseLock } from '@agogpixel/pgmmv-resource-support/src/locks/release-lock.type';
import { getStringByteLength } from '@agogpixel/pgmmv-resource-support/src/string/get-string-byte-length.function';
import { pollWithBackoff } from '@agogpixel/pgmmv-resource-support/src/time/poll-with-backoff.function';

import type { AppendFileOperationPayload } from './append-file-operation-payload.interface';

/**
 * Append file operation.
 *
 * @param payload Operation payload.
 * @param releaseLock Release lock callback.
 */
export function appendFileOperation(payload: AppendFileOperationPayload, releaseLock: ReleaseLock) {
  const path = payload.path;
  const data = payload.data;
  const callback = payload.callback;

  const oldFileContent = jsb.fileUtils.getStringFromFile(path);
  const newFileContent = `${oldFileContent ? oldFileContent + '\n' : ''}${data}`;
  const newFileSize = getStringByteLength(newFileContent);

  function conditional() {
    return newFileSize === jsb.fileUtils.getFileSize(path);
  }

  function onProceed() {
    releaseLock();
    callback(true);
  }

  function onTimeout(elapsed: number) {
    releaseLock();
    callback(false, `Append operation to '${path}' timed out after ${elapsed / 1000}s`);
  }

  const result = jsb.fileUtils.writeStringToFile(newFileContent, path);

  if (!result) {
    releaseLock();
    callback(false, `Append operation to '${path}' failed immediately`);
    return;
  }

  pollWithBackoff(conditional, onProceed, onTimeout, 1000, 5);
}
