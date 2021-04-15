import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';

import IStorageProvider from '../models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3();
  }

  async saveFile(file: string): Promise<string> {
    const filePath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.getType(filePath);

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(filePath);

    await this.client
      .putObject({
        Bucket: uploadConfig.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(filePath);

    return file;
  }

  async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.aws.bucket,
        Key: file,
      })
      .promise();
  }
}

export default S3StorageProvider;
