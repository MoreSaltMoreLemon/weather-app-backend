'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from './logger';

import apiRouter from '../routes/api-routes';

const app = express();
let server = null;

app.use(cors());
app.use(bodyParser.json());

app.use(apiRouter);

app.all('*', (req, res) => {
  logger.log(logger.INFO, 'Returning a 404 from the catch-all/default route');
  return res.sendStatus(404);
});

const startServer = () => {
  server = app.listen(process.env.PORT, () => {
    logger.log(logger.INFO, `Server is listening on port ${process.env.PORT}`);
  });
};

const stopServer = () => {
  server.close(() => {
    logger.log(logger.INFO, 'Server is off');
  });
};

export { startServer, stopServer };