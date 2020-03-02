import express, { response } from 'express';

var app: express.Express = express();

const PORT = process.env.PORT || '3000';
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);;
    console.log('server started.')
});
