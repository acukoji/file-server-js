// choose a custom port to run integ tests on
process.env.PORT = '3333';

// supertest--allows requests to be made programatically to app server in your tests.
// configure and create an app server once by importing index
// this instance will be reused for every test.
import request from 'supertest';
import server from '../index';

// run integ tests
// jest -c jest.config.integration.js 

// after all test are executed, shutdown server
afterAll((done) => {
    server.close(done);
});

describe('foo', () => {
    it('is running', async () => {
        const resp = await request(server)
            .get('/');

        // assert 200 http status code to confirm server is running
        // for endpoints other than the root, you also get
        // information on what type of in
        expect(resp.status).toBe(200);
        expect(resp.text).toBe('File Server\n')
    });

    it('/foo/:id returns value', async () => {
        const resp = await request(server)
            .get('/foo/cevaris');

        expect(resp.status).toBe(200);
        expect(resp.text).toBe('cevaris bar\n')
    });

    //how to send parameters using supertest
    //TODO: make integration tests for endpoints in foo 

    it('/foo/ returns bar', async () => {
        const resp = await request(server)
            .get('/foo');

        expect(resp.status).toBe(200);
        expect(resp.text).toBe('bar\n')
    });

    it('/foo/frog hits /foo/:id and returns frog bar', async () => {
        const resp = await request(server)
            .get('/foo/frog');

        expect(resp.status).toBe(200);
        expect(resp.text).toBe('frog bar\n')
    });

    it('/foo/mouse returns mouse bar', async () => {
        const resp = await request(server)
            .get('/foo/mouse');

        expect(resp.status).toBe(200);
        expect(resp.text).toBe('mouse bar\n')
    });

    it('/foo/pow/:base/:exponent and returns 8', async () => {
        const resp = await request(server)
            .get('/foo/pow/2/3');

        expect(resp.status).toBe(200);
        expect(resp.text).toBe('pow: 8\n');
    });

    it('/foo/pow?base=2&exponent=3 hits /foo/pow and returns 8', async () => {
        const resp = await request(server)
            .get('/foo/pow?base=2&exponent=3');

        expect(resp.status).toBe(200);
        //console.log(resp.text);
        expect(resp.text).toBe('pow: 8\n');
    });

});

