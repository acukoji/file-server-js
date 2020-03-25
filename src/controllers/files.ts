import express from 'express';

module.exports = (app: express.Express) => {
    app.use(express.static('public'));
};