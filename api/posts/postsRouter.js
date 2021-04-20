const express = require('express');
const Posts = require('./posts-model');
//middleware

const router = express.Router();

router.get('/:id/posts', (req, res) => {
    // RETURN THE ARRAY OF USER POSTS
    // this needs a middleware to verify user id
  });
  
  router.post('/:id/posts', (req, res) => {
    // RETURN THE NEWLY CREATED USER POST
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
  });


module.exports = router;