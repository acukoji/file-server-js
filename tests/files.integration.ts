// supertest--allows requests to be made programatically to app server in your tests.
// configure and create an app server once by importing index
// this instance will be reused for every test.
import request from 'supertest';
import fs from 'fs';
import http from 'http';
import { v4 } from 'uuid';
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

    it('photo.jpg', async () => {
        const resp = await request(server)
            .get('/files/photo.jpg');

        // assert 200 http status code to confirm server is running
        // for endpoints other than the root, you also get
        // information on what type of in
        expect(resp.status).toBe(200);

        const photoByteLength = 2111089;
        const photoBuffer: Buffer = resp.body;
        expect(photoBuffer.length).toBe(photoByteLength);
    });

    it('upload file', async () => {
        const uuid = v4();
        const filePath = '/tmp/test-upload.txt';
        // create tmpfile with unique number 
        await fs.promises.writeFile(filePath, uuid);

        // upload tmp file
        const uploadResp = await request(server)
            .post('/files.json')
            .attach('file', filePath);
        expect(uploadResp.status).toBe(200);
        expect(uploadResp.body.status).toBe(true);

        // fetch uploaded file
        const getResponse = await request(server)
            .get('/files/test-upload.txt');
        // assert contents of file
        expect(getResponse.status).toBe(200);
        expect(getResponse.text).toBe(uuid);
    });
})