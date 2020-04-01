// supertest--allows requests to be made programatically to app server in your tests.
// configure and create an app server once by importing index
// this instance will be reused for every test.
import request from 'supertest';
import http from 'http';
import { app } from '../src/app';

// run integ tests
// jest -c jest.config.integration.js 

let server: http.Server;
beforeAll(() => {
    server = app.listen();
})

// after all test are executed, shutdown server
afterAll((done) => {
    server.close(done);
});

describe('calc', () => {
    //app.get('/foo/pow', (req: express.Request, res: express.Response) => {
    //    console.log(req.params);
    //    console.log(req.query);
    //    res.send(`pow: ${Math.pow(parseInt(req.query.base), parseInt(req.query.exponent))}\n`);
    //});

    //it('/foo/pow/:base/:exponent and returns 8', async () => {
    //    const resp = await request(server)
    //        .get('/foo/pow/2/3');
    //
    //    expect(resp.status).toBe(200);
    //    expect(resp.text).toBe('pow: 8\n');
    //});
    
    it('/calc/add/:first/:second and returns 10', async () => {
        const resp = await request(server)
            .get('/calc/add?first=3&second=7');
        //console.log(resp.text)
        expect(resp.status).toBe(200);
        console.log(resp.status)
        expect(resp.text).toBe('add: 10\n');
    });

    it('/calc/sub/:first/:second and returns 0', async () => {
        const resp = await request(server)
            .get('/calc/sub?first=10&second=10');
        //console.log(resp.text)
        expect(resp.status).toBe(200);
        expect(resp.text).toBe('sub: 0\n');

    });

    it('/calc/mult/:first/:second and returns 20', async () => {
        const resp = await request(server)
            .get('/calc/mult?first=2&second=10');
        //console.log(resp.text)
        expect(resp.status).toBe(200);
        expect(resp.text).toBe('mult: 20\n');
    });

    it('/calc/div/:first/:second and returns 5', async () => {
        const resp = await request(server)
            .get('/calc/div?first=10&second=2');
        //console.log(resp.text)
        expect(resp.status).toBe(200);
        expect(resp.text).toBe('div: 5\n');
    });

})
