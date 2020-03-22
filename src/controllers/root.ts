import express, { response } from 'express';
// express is an http web frame work allowing server-side service

//const app: express.Express = express();
// require('./src/controllers/foo')(app);

module.exports = (app: express.Express) => {
    app.get('/', (req: express.Request, res: express.Response) => {
        res.send('File Server\n');
    });
}