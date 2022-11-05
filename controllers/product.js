// Load required packages
var product = require('../models/product');

// Create endpoint /api/product for POST
exports.postProduct = function(req, res) {
  // Create a new instance of the product model
  var product = new product();

  // Set the product properties that came from the POST data
  product.name = req.body.name;
  product.type = req.body.type;
  product.color = req.body.color;
  product.price = req.body.price;
  product.quantity = req.body.quantity;

  // Save the product and check for errors
  product.save(function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'product added to the locker!', data: product });
  });
};

// Create endpoint /api/beers for GET
exports.getProducts = function(req, res) {
  // Use the product model to find all product
  product.find(function(err, beers) {
    if (err)
      return res.send(err);

    res.json(beers);
  });
};

// Create endpoint /api/product/:product_id for GET
exports.getProduct = function(req, res) {
  // Use the product model to find a specific product
  product.find({_id: req.params.beer_id }, function(err, product) {
    if (err)
      return res.send(err);

    res.json(product);
  });
};

// Create endpoint /api/beers/:beer_id for PUT
exports.putProduct = function(req, res) {
  // Use the product model to find a specific product
  product.update({_id: req.params.beer_id }, { quantity: req.body.quantity }, function(err, num, raw) {
    if (err)
      return res.send(err);

    res.json({ message: num + ' updated' });
  });
};

exports.deleteProduct = function(req, res) {
  // Use the product model to find a specific product and remove it
  product.remove({_id: req.params.beer_id }, function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'product removed' });
  });
};