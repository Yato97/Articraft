// Load required packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');
const passport = require('passport');
const path = require('path');


const productController = require('./controllers/product');
const commandeController = require('./controllers/commande');
const userController = require('./controllers/user');

const { request } = require('express');
// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://db-users:27017/Articraft');


// Create our Express application
var app = express();

// Set view engine to ejs
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use express session support since OAuth2orize requires it
app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();
app.use(express.static(__dirname + '/public'));

let url = request.url;
app.get('/', (req, res) => {
  res.render('index')
});
app.get('/shop', (req, res) => {
  productController.getProductArr(function (err, subs) {
    if (err) throw err;
    // else render result
    res.render('shop', { subs: subs });
  });
});

app.get('/stock', (req, res) => {
  productController.getProductArr(function (err, subs) {
    if (err) throw err;
    // else render result
    res.render('Admin', { subs: subs });
  });
});

app.get('/commandes', (req, res) => {
  res.render('stock')
});

router.route('/api/product')
  .post(productController.postProduct)
  .put(productController.putProduct)
  .get(productController.getProducts);

router.route('/api/commande')
  .post(commandeController.postCommande)
  .get(commandeController.getCommande);

  router.route('/api/users')
  .post(userController.postUser);








// Register all our routes
app.use(router);

// Start the server
app.listen(3000);