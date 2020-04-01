import express, { response } from 'express';
// express is an http web frame work allowing server-side service

export const app: express.Express = express();

require('./controllers/root')(app);
require('./controllers/files')(app);
require('./controllers/calc')(app);

// dummy endpoints to show how to create endpoints
require('./controllers/foo')(app);
require('./controllers/utils')(app);