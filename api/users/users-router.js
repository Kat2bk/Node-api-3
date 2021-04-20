const express = require('express');
const Users = require('./users-model');
const {validateUserId, validateUser} = require('../middleware/middleware');

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

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
