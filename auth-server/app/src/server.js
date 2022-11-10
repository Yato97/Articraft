// Lib
const mongoose = require('mongoose');
const amqp = require('amqplib');
const amqph = require('./amqp_helper');

// Connect to user db
mongoose.connect('mongodb://db-users:27017/Articraft');
// Controllers
const userController = require('./controllers/user');

// -------------------- MQ -------------------------------

setTimeout(
  function(){
    amqp.connect('amqp://rabbitmq-server').then(function(conn){
  return conn.createChannel().then(function(ch){
    var q = 'RegisterUser';
    var ok = ch.assertQueue(q, {durable: false});
    return ok.then(function(_qok){
      ch.consume(q, function(msg){
        var userdata = JSON.parse(msg.content.toString())
        // send response
        if(userController.registerUser(userdata)) // try to add client
          amqph.sendMessage(conn,'RegisterUserStatus', JSON.stringify({"status":"ok"}));
        else
          amqph.sendMessage(conn,'RegisterUserStatus', JSON.stringify({"status":"exists"}));
      }, {noAck: true});
    });
  });
}).catch(console.warn);
  }, 5000);



console.log('Auth server waiting for messages');

