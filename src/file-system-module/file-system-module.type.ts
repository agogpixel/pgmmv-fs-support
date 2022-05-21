/**
 * Exports file system module API.
 *
 * @module
 */
import type { FileManager } from '../file-manager.interface';
import type { FileReader } from '../file-reader.interface';
import type { FileWriter } from '../file-writer.interface';

/**
 * File system module API.
 */
export type FileSystemModule = FileManager & FileReader & FileWriter;
