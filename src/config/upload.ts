import multer, { StorageEngine } from 'multer';
import { resolve, extname } from 'path';
import { randomBytes } from 'crypto';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 'disk' | 's3';

  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };

  aws: {
    bucket: string;
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  uploadsFolder: resolve(tmpFolder, 'upload'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(req, file, cb) {
        const hash = randomBytes(8).toString('hex');
        const filename = `${Date.now()}-${hash}${extname(file.originalname)}`;
        return cb(null, filename);
      },
    }),
  },

  aws: {
    bucket: 'maxpb7',
  },
} as IUploadConfig;
