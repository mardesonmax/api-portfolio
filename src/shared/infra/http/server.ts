import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import delay from 'express-delay';

import '../typeorm';
import '@shared/container';
import configUpload from '@config/upload';

import routes from './routes';
import getErrors from './middlewares/getErrors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(delay(1000));

app.use(routes);

app.use(getErrors);

app.use('/files', express.static(configUpload.uploadsFolder));

const port = process.env.PORT || 3333;

app.listen(port, () => console.log('🚀️ Server started'));
