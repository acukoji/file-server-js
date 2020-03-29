import express, { response } from 'express';
// express is an http web frame work allowing server-side service

const app: express.Express = express();

require('./src/controllers/root')(app);
require('./src/controllers/files')(app);

// dummy endpoints to show how to create endpoints
require('./src/controllers/foo')(app);
require('./src/controllers/utils')(app);

const PORT = process.env.PORT || '3000';
// for development, choosing 3000 to be the default port if no PORT chosen
console.log('server starting....');

const server = app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
    console.log('server started.');  
});

process.on('SIGINT', () => {
    server.close(() => {
      console.log('Process terminated')
    });
});

export default server;