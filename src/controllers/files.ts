import express from 'express';
import fileUpload from 'express-fileupload';
import fs from 'fs';

module.exports = (app: express.Express) => {
    // serves files located in "public" directory
    app.use(express.static('public'));

    // endpoint to accept file uploads
    app.post('/files.json',
        async (req: express.Request, res: express.Response) => {
            //making sure that there is a file
            if (!req.files) {
                res
                    .status(400)
                    .send({
                        status: false,
                        message: 'No file uploaded'
                    });
                return;
            }

            // Use the name of the input field (i.e. "file") to retrieve the uploaded file
            // Check the req.files.file type, and only get the first file
            const file: fileUpload.UploadedFile = (req.files.file.constructor == Array) ?
                (<fileUpload.UploadedFile[]>req.files.file)[0] :
                (<fileUpload.UploadedFile>req.files.file);

            // on server side file first goes to tmp before it can be
            // moved to public/files.   These are for server-side things.
            //moving file from temp directory to where we want it to be stored
            file.mv('./public/files/' + file.name);

            res
                .status(200)
                .send({
                    status: true,
                    message: 'File is uploaded'
                });
        }
    );

    //endpoint to delete file
    app.delete('/files/:filename',
        async (req: express.Request, res: express.Response) => {
            //making sure there is a file (acutally un-needed due to url endpoint
            //specifying a :filename)
            // if(!req.params.filename){
            //     res
            //         .status(400)
            //         .send(`${req.params.filename} deleted\n`)
            //     return;
            // }

            // Use the name of the input field (i.e. "file") to retrieve the file
            // Check the req.files.file type, and only get the first file

            // const file: fileUpload.UploadedFile = (req.files.file.constructor == Array) ?
            //     (<fileUpload.UploadedFile[]>req.files.file)[0] :
            //     (<fileUpload.UploadedFile>req.files.file);

            // file.rm('./public/files/' + file.name);           
            try {
                await fs.promises.unlink('./public/files/' + req.params.filename);
            } catch (error) {
                console.error(error);
                // throw error
                res
                    .status(400)
                    .send({
                        status: false,
                        message: req.params.filename + ' does not exist.'
                    });
                return;
            }

            //run this logic only if we don't catch an error
            res
                .status(200)
                .send({
                    status: true,
                    message: 'Deleted ' + req.params.filename
                });
        }
    );

    // create delete endpoint that prints the file name to be deleted
    // $ curl -X DELETE localhost:3000/files/newPatient.pdf
    // deleted newPatient.pdf
};