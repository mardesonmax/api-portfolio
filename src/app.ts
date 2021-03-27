import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';

import './database';

import routes from './routes';
import getErrors from './middlewares/getErrors';

const app = express();
app.use(express.json());

app.use(routes);

app.use(getErrors);

export default app;
