const express = require('express');
const server = express();

const {logger} = require('./api/middleware/middleware');
const usersRouter = require('./api/users/users-router');
const postsRouter = require('./api/posts/postsRouter');

//portRouter, userRouter, middleware
server.use(express.json());
server.use(logger);

server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
    res.send('Welcome to the API, please go to <b>/api/users</b> or <b>/api/posts!</b>')
})

module.exports = server;  


