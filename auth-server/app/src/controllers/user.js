// Load required packages
const User = require('../models/user');

exports.registerUser = function(userdata){
  var code = false;
  User.find({username: userdata.username}, function(err, user) {
    console.log('sdflnjkdxfcnhcfxvkhgxkflcjgihx wxfjhglcxfgi')
    if (err){
      console.log('Adding user : '+userdata);
      user.save(function(err) {
        if (err)
          console.log("can't save user : "+userdata);
        else
          code = true;
      });
    } else {
      console.log("user : "+userdata+" already exists");
    }
  });
  return code;
};