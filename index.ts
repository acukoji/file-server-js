import express, { response } from 'express';
// express is an http web frame work allowing server-side service

const app: express.Express = express();

require('./src/controllers/foo')(app);

// TODO: move to ./src/controllers/root.ts
app.get('/', (req: express.Request, res: express.Response) => {
    res.send('File Server\n');
});

// TODO: move to ./src/controllers/utils.ts
app.get('/my-ip-address', (req: express.Request, res: express.Response) => {
    res.send(req.ip + '\n');
});

// TODO: move to ./src/controllers/utils.ts
app.get('/latest-time', (req: express.Request, res: express.Response) => {
    const now = new Date();
    //console.log(now)
    res.send(now + '\n');
});

const PORT = process.env.PORT || '3000';
// for development, choosing 3000 to be the default port if no PORT chosen
console.log('server starting....');
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
    console.log('server started.');
});
