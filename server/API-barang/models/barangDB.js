const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    size: {
      S: { type: Number, min: 0, default: 0 },
      M: { type: Number, min: 0, default: 0 },
      L: { type: Number, min: 0, default: 0 }
    },
    price: { type: Number, min: 0, required: true },
    image: { type: String, required: false }
  },
  {
    collection: "product",
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;