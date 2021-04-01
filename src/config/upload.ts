import multer from 'multer';
import path from 'path';
import { randomBytes } from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp', 'upload');

export default {
  tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(req, file, cb) {
      const hash = randomBytes(8).toString('hex');
      const filename = `${Date.now()}-${hash}${path.extname(
        file.originalname
      )}`;
      return cb(null, filename);
    },
  }),
};
