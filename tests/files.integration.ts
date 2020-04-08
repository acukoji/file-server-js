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
beforeAll((done) => {
    server = app.listen(done);
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
        // universally unique id. v4--spec for generating uuid
        // generates random id to assert on
        const uuid = v4();

        //on client side, we are prepping new file to be uploaded
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

    // TODO: Koji complete delete integ test
    // must upload, delete, assert.
    // request is a function/builder in supertest.


    it('delete a file', async () => {
        const uuid = v4();

        //on client side, we are prepping new file to be uploaded
        const filePath = '/tmp/test-delete.txt';
        // create tmpfile with unique number 
        await fs.promises.writeFile(filePath, uuid);

        // upload tmp file
        const uploadResp = await request(server)
            //not a file path.  it's url that expresses
            //matching to do some action
            .post('/files.json')
            .attach('file', filePath);
        expect(uploadResp.status).toBe(200);
        expect(uploadResp.body.status).toBe(true);

        // create tmpfile with unique number 
        //await fs.promises.writeFile(filePath, 'delete file contents');

        // delete uploaded file
        const deleteResponse = await request(server)
            .delete('/files/test-delete.txt');
        // assert contents of file
        expect(deleteResponse.status).toBe(200);

        // trying to fetch again (should not be there)
        const getResponse = await request(server)
            .get('/files/test-delete.txt');
        // assert contents of file
        expect(getResponse.status).toBe(404);
    });
})