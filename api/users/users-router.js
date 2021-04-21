const express = require('express');
const Users = require('./users-model');
const {validateUserId, validateUser, validatePost} = require('../middleware/middleware');
const Posts = require('../posts/posts-model');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  try {
    const users = await Users.get()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({
      error: "Uh oh something went wrong"
    })
  }

});

router.get('/:id', validateUserId, async (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  try {
    const user = await Users.getById(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({
      error: "Uh oh something went wrong"
    })
  }
});

router.post('/', validateUser, async (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  try {
    const newUser = await Users.insert(req.body)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({
      error: "Uh oh something went wrong"
    })
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
  try {
    const updatedUser = await Users.update(req.params.id, req.body)
    res.status(200).json(updatedUser)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "Uh oh something went wrong"
    })
  }
});

router.delete('/:id', validateUserId, async (req, res) => {
  try {
    const deletedUser = await Users.remove(req.params.id)
    res.status(204).json(deletedUser)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "Uh oh something went wrong"
    })
  }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try {
      const userPosts = await Users.getUserPosts(req.params.id)
      res.status(200).json(userPosts)
  } catch (error) {
      console.log(error)
      res.status(500).json({
          message: "Uh oh something went wrong", error
      })
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  const newPost = {
    user_id: req.params.id,
    text: req.body.text
  }
  
  try {
    const userPost = await Posts.insert(newPost)
    res.status(201).json(userPost)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Uh oh something went wrong", error
  })
  }
});

module.exports = router;
