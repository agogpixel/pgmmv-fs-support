/**
 * Exports write file operation function.
 *
 * @module
 */
import type { ReleaseLock } from '@agogpixel/pgmmv-resource-support/src/locks/release-lock.type';
import { getStringByteLength } from '@agogpixel/pgmmv-resource-support/src/string/get-string-byte-length.function';
import { pollWithBackoff } from '@agogpixel/pgmmv-resource-support/src/time/poll-with-backoff.function';

import type { WriteFileOperationPayload } from './write-file-operation-payload.interface';

/**
 * Write file operation.
 *
 * @param payload Operation payload.
 * @param releaseLock Release lock callback.
 */
export function writeFileOperation(payload: WriteFileOperationPayload, releaseLock: ReleaseLock) {
  const path = payload.path;
  const data = payload.data;
  const callback = payload.callback;

  const fileSize = jsb.fileUtils.getFileSize(path);
  const dataSize = getStringByteLength(data);

  let conditional: () => boolean;

  if (fileSize !== dataSize) {
    // Poll file size change.
    conditional = function conditional() {
      return dataSize === jsb.fileUtils.getFileSize(path);
    };
  } else {
    // Poll file content change.
    conditional = function conditional() {
      return data === jsb.fileUtils.getStringFromFile(path);
    };
  }

  function onProceed() {
    releaseLock();
    callback(true);
  }

  function onTimeout(elapsed: number) {
    releaseLock();
    callback(false, `Write operation to '${path}' timed out after ${elapsed / 1000}s`);
  }

  const result = jsb.fileUtils.writeStringToFile(data, path);

  if (!result) {
    releaseLock();
    callback(false, `Write operation to '${path}' failed immediately`);
    return;
  }

  pollWithBackoff(conditional, onProceed, onTimeout, 1000, 5);
}
