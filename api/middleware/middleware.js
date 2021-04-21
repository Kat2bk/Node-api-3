const Users = require('../users/users-model');
const {BaseError} = require('./errorMiddleware');

function logger(req, res, next) {
  // DO YOUR MAGIC
  const time = new Date();
  console.log(`This is a ${req.method} at ${req.url} at ${time}`);
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  Users.getById(req.params.id)
  .then(user => {
    if (user) {
      req.user = req.params.id
      next()
    } else {
      // res.status(404).json({ message: "Unable to find user" })
      throw new BaseError(404, 'Unable to find user')
    }
  })
  .catch(error => {
    next(error)
  })
}

function validateUser(req, res, next) {
  const {name} = req.body;

  //if (req.body && req.body.name) 

  //Object.entries(req.body).length === 0 ?
  if (!name.trim()) {
    throw new BaseError(400, 'Missing required name field')
  } else {
    next()
  } 
}

function validatePost(req, res, next) {

  if (req.params.id && req.body.text) {
    next()
  } else if (req.body.user_id && !req.body.text) {
    throw new BaseError(400, 'Missing required text field')
  } else {
    throw new BaseError(500, 'Something happened with the server, try again')
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}