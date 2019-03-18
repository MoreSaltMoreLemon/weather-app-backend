'use strict';

import { Router } from 'express';
import superagent from 'superagent';

import logger from '../lib/logger';

const apiRouter = new Router();

apiRouter.post('/location', (request, response) => {
  let location = request.body.location;
  debugger;
  return superagent.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_KEY}`)
    .type('application/json')
    .then((data) => {
      return response.send(data.body);
    })
    .catch((err) => {
      logger.log(logger.ERROR, `ERR, ${err}`);
    })
})

apiRouter.post('/weather', (request, response) => {
  let lat = request.body.lat;
  let lng = request.body.lng;
  return superagent.get(`https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${lat},${lng}`)
    .then('application/json')
    .then((data) => {
      return response.send(data.body);
    })
    .catch((err) => {
      logger.log(logger.ERROR, `ERR, ${err}`);
    })
})

export default apiRouter;