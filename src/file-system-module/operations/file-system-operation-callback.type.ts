/**
 * Exports file system operation callback type.
 *
 * @module
 */
import type { JsonValue } from '@agogpixel/pgmmv-ts/api/types/json';

/**
 * File system operation callback.
 *
 * @param success Operation success flag.
 * @param data Result or error message.
 */
export type FileSystemOperationCallback = (success: boolean, data?: JsonValue) => void;
