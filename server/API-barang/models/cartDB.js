const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: String, required:true},  // Add this line
  name: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
}, {
  collection: "cart",
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;