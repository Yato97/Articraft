// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var ProductSchema   = new mongoose.Schema({
  name: String,
  type: String,
  color: String,
  quantity: Number,
  price: Number,
});

// Export the Mongoose model
var Product = module.exports = mongoose.model('Product', ProductSchema);