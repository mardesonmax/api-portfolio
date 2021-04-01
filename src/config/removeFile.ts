import { resolve } from 'path';
import fs from 'fs';

import uploadConfig from './upload';

export default function removeFile(filename: string): void {
  const directory = resolve(uploadConfig.tmpFolder, filename);
  fs.promises.unlink(directory);
}
