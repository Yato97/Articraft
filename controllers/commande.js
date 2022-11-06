// Load required packages
var Commande = require('../models/commande');

// Create endpoint /api/commande for POST
exports.postCommande = function(req, res) {
  // Create a new instance of the commande model
  var commande = new Commande();

  // Set the commande properties that came from the POST data
  commande.refcommande = req.body.refcommande;
  commande.price = req.body.price;
  commande.idclient = req.body.idclient;
  commande.addr = req.body.addr;
  commande.email = req.body.email;
  commande.status = req.body.status;

  // Save the commande and check for errors
  commande.save(function(err) {
    if (err)
      return res.send(err);

    res.render({ message: 'commande added to DB', data: commande });
  });
};

// Create endpoint /api/beers for GET
exports.getCommande = function(req, res) {
  // Use the commande model to find all commande
  commande.find(function(err, beers) {
    if (err)
      return res.send(err);

    res.json(beers);
  });
};

// Create endpoint /api/commande/:product_id for GET
exports.getCommande = function(req, res) {
  // Use the commande model to find a specific commande
  commande.find({_id: req.params.beer_id }, function(err, commande) {
    if (err)
      return res.send(err);

    res.json(commande);
  });
};

// Create endpoint /api/beers/:beer_id for PUT
exports.putCommande = function(req, res) {
  // Use the commande model to find a specific commande
  commande.update({_id: req.params.beer_id }, { quantity: req.body.quantity }, function(err, num, raw) {
    if (err)
      return res.send(err);

    res.json({ message: num + ' updated' });
  });
};

exports.deleteCommande = function(req, res) {
  // Use the commande model to find a specific commande and remove it
  commande.remove({_id: req.params.beer_id }, function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'commande removed' });
  });
};