import express, { response } from 'express';

var app: express.Express = express();

const PORT = process.env.PORT || '3000';

console.log('server starting....');
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
    console.log('server started.');
});

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('File Server');
});

app.get('/foo', (req: express.Request, res: express.Response) => {
    res.send('bar');
});

app.get('/my-ip-address', (req: express.Request, res: express.Response) => {
    res.send(req.ip);
});

// TODO: koji create a GET HTTP endpoint that returns latest time
// Note `const now = new Date();`