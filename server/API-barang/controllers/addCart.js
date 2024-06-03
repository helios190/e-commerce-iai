const Product = require('../models/barangDB.js');
const Cart = require('../models/cartDB.js');

const addToCart = async (req, res) => {
  const { userId, name, size } = req.body;

  if (!userId || !name || !size) {
    return res.status(400).json({ error: 'User ID, name, and size are required' });
  }

  try {
    const product = await Product.findOne({ name, [`size.${size}`]: { $gt: 0 } });

    if (!product) {
      return res.status(404).json({ error: 'Product not found or size not available' });
    }

    const existingCartItem = await Cart.findOne({ userId, name, size });

    if (existingCartItem) {
      existingCartItem.quantity += 1;
      await existingCartItem.save();
      return res.json({ message: 'Product quantity updated in cart', cartItem: existingCartItem });
    } else {
      const newCartItem = new Cart({
        userId,
        name: product.name,
        size: size,
        quantity: 1,
      });

      await newCartItem.save();
      return res.json({ message: 'Product added to cart', cartItem: newCartItem });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to add product to cart' });
  }
};

module.exports = addToCart;
