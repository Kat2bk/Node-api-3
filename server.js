const express = require('express');
const server = express();

const {logger} = require('./api/middleware/middleware');

//portRouter, userRouter, middleware
server.use(express.json());

server.use(logger);

server.get('/', (req, res) => {
    res.send('Welcome to the API, please go to <b>/api/users</b> or <b>/api/posts!</b>')
})

module.exports = server;  


