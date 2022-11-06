// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var CommandeSchema = new mongoose.Schema({
  refcommande: {
    type: String,
    unique: true,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  idclient: {
    type: String,
    required: true
  },
  addr: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    },
    status: {
        type: String,
        required: true
      }
});

// Export the Mongoose model
module.exports = mongoose.model('Commande', CommandeSchema);