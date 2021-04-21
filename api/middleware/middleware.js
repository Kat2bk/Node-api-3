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
      req.user = req.params.id
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
  const {name} = req.body;

  //if (req.body && req.body.name) 

  //Object.entries(req.body).length === 0 ?
  if (!name.trim()) {
    res.status(400).json({ messsage: "Missing required name field"})
  } else {
    next()
  }
  
}

function validatePost(req, res, next) {

  if (req.params.id && req.body.text) {
    next()
  } else if (req.body.user_id && !req.body.text) {
    res.status(400).json({ message: "Missing required text field"})
  } else {
    res.status(500).json({ error: "Uh oh something happened"})
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}