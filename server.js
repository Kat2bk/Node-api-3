const express = require('express');
const server = express();

const {logger} = require('./api/middleware/middleware');
const usersRouter = require('./api/users/users-router');
// const postsRouter = require('./api/posts/postsRouter');
const {handleError, BaseError} = require('./api/middleware/errorMiddleware');

//portRouter, userRouter, middleware
server.use(express.json());
server.use(logger);

server.use('/api/users', usersRouter);
// server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
    res.send('Welcome to the API, please go to <b>/api/users</b> or <b>/api/posts!</b>')
})

// error middleware
server.use((err, req, res, next) => {
    console.log(err)
    handleError(err, res);

    if (!err) {
        next(err)
    }
})

server.use((err, req, res, next) => {
    res.status(500).json({ message: "Something went wrong, try again"})
})

module.exports = server;  


