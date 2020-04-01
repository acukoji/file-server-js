import express, { response } from 'express';
//export module.exports

module.exports = (app: express.Express) => {
    app.get('/foo', (req: express.Request, res: express.Response) => {
        res.send('bar\n');
    });

    app.get('/foo/mouse', (req: express.Request, res: express.Response) => {
        res.send('mouse bar\n');
    });

    // /foo/pow?base=2&exponent=3
    app.get('/foo/pow', (req: express.Request, res: express.Response) => {
        console.log(req.params);
        console.log(req.query);
        res.send(`pow: ${Math.pow(parseInt(req.query.base), parseInt(req.query.exponent))}\n`);
    });
    // This path co-opts all /foo/x endpoints that do not have addition levels (/)
    app.get('/foo/:id', (req: express.Request, res: express.Response) => {
        res.send(`${req.params.id} bar\n`);
    });

    // This path is hidden by /foo/:id
    app.get('/foo/frog', (req: express.Request, res: express.Response) => {
        res.send('real frog bar\n');
    });
    
    // /foo/pow/2/3
    app.get('/foo/pow/:base/:exponent', (req: express.Request, res: express.Response) => {
        res.send(`pow: ${Math.pow(parseInt(req.params.base), parseInt(req.params.exponent))}\n`);
    });
}
