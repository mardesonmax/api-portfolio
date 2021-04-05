import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';
import configUpload from '@config/upload';

import express from 'express';
import 'express-async-errors';

import '../typeorm';
import '@shared/container';

import routes from './routes';
import getErrors from './middlewares/getErrors';

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);

app.use(getErrors);

app.use('/files', express.static(configUpload.tmpFolder));

const port = process.env.PORT || 3333;

app.listen(port, () => console.log('🚀️ Server started'));
