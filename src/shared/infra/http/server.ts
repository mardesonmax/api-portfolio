import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import 'express-async-errors';

import '../typeorm';
import '@shared/container';

import routes from './routes';
import getErrors from './middlewares/getErrors';

const app = express();
app.use(express.json());

app.use(routes);

app.use(getErrors);

const port = process.env.PORT || 3333;

app.listen(port, () => console.log('🚀️ Server started'));
