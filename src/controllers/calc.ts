import express, { response } from 'express';
//export module.exports

module.exports = (app: express.Express) => {

    app.get('/calc/add', (req: express.Request, res: express.Response) => {
        console.log(req.params);
        console.log(req.query);
        res.send(`add: ${(parseInt(req.query.first) + parseInt(req.query.second))}\n`);
    });

    app.get('/calc/sub', (req: express.Request, res: express.Response) => {
        console.log(req.params);
        console.log(req.query);
        res.send(`sub: ${(parseInt(req.query.first) - parseInt(req.query.second))}\n`);
    });

    app.get('/calc/mult', (req: express.Request, res: express.Response) => {
        console.log(req.params);
        console.log(req.query);
        res.send(`mult: ${(parseInt(req.query.first) * parseInt(req.query.second))}\n`);
    });

    app.get('/calc/div', (req: express.Request, res: express.Response) => {
        console.log(req.params);
        console.log(req.query);
        res.send(`div: ${(parseInt(req.query.first) / parseInt(req.query.second))}\n`);
    });

    //app.get('/calc/pow', (req: express.Request, res: express.Response) => {
    //    console.log(req.params);
    //    console.log(req.query);
    //    res.send(`pow: ${Math.pow(parseInt(req.query.base), parseInt(req.query.exponent))}\n`);
    //});
}
