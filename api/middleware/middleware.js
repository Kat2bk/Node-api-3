const Users = require('../users/users-model');

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
      req.user = user
      next()
    } else {
      res.status(404).json({ message: "Unable to find user" })
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Uh oh something happened", error
    })
  })
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  
}