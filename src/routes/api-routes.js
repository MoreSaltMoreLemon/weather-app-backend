'use strict';

import { Router } from 'express';
import superagent from 'superagent';

import logger from '../lib/logger';

const apiRouter = new Router();

apiRouter.get('/test', (request, response) => {
  return superagent.get(process.env.TEST_API)
    .type('application/json')
    .then((data) => {
      console.log(data.body);
      return data.body;
    })
    .catch((err) => {
      logger.log(logger.ERROR, `ERR, ${err}`);
    })
})

export default apiRouter;