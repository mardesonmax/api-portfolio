import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import configUpload from '@config/upload';
import routes from './routes';
import getErrors from './middlewares/getErrors';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(configUpload.uploadsFolder));
app.use(routes);

app.use(errors());
app.use(getErrors);

const port = process.env.PORT || 3333;

app.listen(port, () => console.log('🚀️ Server started'));
