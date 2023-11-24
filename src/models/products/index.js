const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: Number,
  name: String,
  price: Number,
  description: String,
  imgSrc: String,
  reducedPricePercentage: String,
  isPinned: Boolean,
  category: String,
  code: String,
  inStock: Boolean,
});

// Create a Mongoose model using the productSchema
const Product = mongoose.model("products", productSchema);

module.exports = Product;
