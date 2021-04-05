import { resolve } from 'path';
import fs from 'fs';

import uploadConfig from './upload';

export default async function removeFile(filename: string): Promise<void> {
  const directory = resolve(uploadConfig.tmpFolder, filename);

  try {
    await fs.promises.stat(directory);
  } catch {
    return;
  }

  fs.promises.unlink(directory);
}
