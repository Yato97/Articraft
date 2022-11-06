// Lib
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const authController = require('./controllers/auth');
const clientController = require('./controllers/client');
const oauth2Controller = require('./controllers/oauth2');






// Connect to user db
mongoose.connect('mongodb://mongodb-server:27017/articraft');


// Controllers
const userController = require('./controllers/user');


// Create our Express application
const app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Use express session support since OAuth2orize requires it
app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));


// Use environment defined port or 3001
const port = process.env.PORT || 3001;
// Create our Express router
const router = express.Router();

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

// Create endpoint handlers for /clients
router.route('/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);

// Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);


// Register all our routes with /api
app.use('/api', router);
// Start the server
app.listen(port);
console.log('Auth server listening on ' + port);

console.log('ok');
