const express = require('express');
const Posts = require('./posts-model');
const Users = require('../users/users-model');
const {validatePost, validateUserId} = require('../middleware/middleware');
//middleware

const router = express.Router();


module.exports = router;