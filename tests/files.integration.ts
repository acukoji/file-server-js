// choose a custom port to run integ tests on
process.env.PORT = '3334';

// supertest--allows requests to be made programatically to app server in your tests.
// configure and create an app server once by importing index
// this instance will be reused for every test.
import request from 'supertest';
import server from '../index';

// run integ tests
// jest -c jest.config.integration.js 

// after all test are executed, shutdown server
afterAll(() => {
    server.close();
});

describe('files', () => {
    it('photo.jpg', async () => {
        const resp = await request(server)
            .get('/files/photo.jpg');

        // assert 200 http status code to confirm server is running
        // for endpoints other than the root, you also get
        // information on what type of in
        expect(resp.status).toBe(200);
        // expect(resp.text).toBe('photo.jpg')

        const photoByteLength = 2111089;
        expect(resp.body instanceof Buffer).toBe(true);
        expect((resp.body as Buffer).length).toBe(photoByteLength);
    });
})