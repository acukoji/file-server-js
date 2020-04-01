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

describe('files', () => {
    it('is running', async () => {
        const resp = await request(server)
            .get('/');

        // assert 200 http status code to confirm server is running
        // for endpoints other than the root, you also get
        // information on what type of in
        expect(resp.status).toBe(200);
        //console.log(resp.status)
        expect(resp.text).toBe('File Server\n')
    });

    //it('photo.jpg', async () => {
    //    const resp = await request(server)
    //        .get('/files/photo.jpg');
//
    //    // assert 200 http status code to confirm server is running
    //    // for endpoints other than the root, you also get
    //    // information on what type of in
    //    expect(resp.status).toBe(200);
    //    // expect(resp.text).toBe('photo.jpg')
//
    //    const photoByteLength = 2111089;
    //    const photoBuffer: Buffer = resp.body;
    //    expect(photoBuffer.length).toBe(photoByteLength);
    //});
})