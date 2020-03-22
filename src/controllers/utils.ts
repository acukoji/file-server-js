import express, { response } from 'express';
// express is an http web frame work allowing server-side service

module.exports = (app: express.Express) => {

    app.get('/my-ip-address', (req: express.Request, res: express.Response) => {
        res.send(req.ip + '\n');
    });

    app.get('/latest-time', (req: express.Request, res: express.Response) => {
        const now = new Date();
        //console.log(now)
        res.send(now + '\n');
    });
}