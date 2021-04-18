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
import rateLimiter from './middlewares/rateLimiter';

const app = express();

const corsOptions = {
  origin: process.env.WEB_BASE_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(rateLimiter);
app.use('/files', express.static(configUpload.uploadsFolder));
app.use(routes);

app.use(errors());
app.use(getErrors);

const port = process.env.PORT || 3333;

app.listen(port, () => console.log('🚀️ Server started'));
