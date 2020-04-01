import express, { response } from 'express';
import fileUpload from 'express-fileupload';
// express is an http web frame work allowing server-side service

export const app: express.Express = express();

app.use(fileUpload());

require('./controllers/root')(app);
require('./controllers/files')(app);

// dummy endpoints to show how to create endpoints
require('./controllers/foo')(app);
require('./controllers/utils')(app);
require('./controllers/calc')(app);