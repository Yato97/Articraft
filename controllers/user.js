// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    prenom: req.body.prenom,
    email: req.body.email,
    addr: req.body.addr,
    datenaissance: req.body.datenaissance
  });

  user.save(function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'ok!' });
  });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      return res.send(err);

    res.json(users);
  });
};