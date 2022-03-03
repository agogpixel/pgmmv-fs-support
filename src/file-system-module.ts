import type { FileManager } from './file-manager';
import type { FileReader } from './file-reader';
import type { FileWriter } from './file-writer';

/**
 *
 */
export type FileSystemModule = FileManager & FileReader & FileWriter;
