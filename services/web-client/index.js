const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');

// eslint-disable-next-line import/prefer-default-export
exports.webServer = () => {
    const server = express();
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());

    (async () => {
        const app = next({ dev: false });
        const defaultRequestHandler = app.getRequestHandler();
        const prepare = app.prepare();
        await prepare;
        server.get('*', (req, res) => defaultRequestHandler(req, res));
    })();

    return server;
};
