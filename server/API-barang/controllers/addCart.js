const Product = require('../models/barangDB.js');
const Cart = require('../models/cartDB.js');

const addToCart = async (req, res) => {
  const { userId, name, size } = req.body;

  // Validate required fields
  if (!userId || !name || !size) {
    return res.status(400).json({ error: 'User ID, name, and size are required' });
  }

  try {
    // Find the product by name and size
    const product = await Product.findOne({ name, [`size.${size}`]: { $gt: 0 } });

    if (!product) {
      return res.status(404).json({ error: 'Product not found or size not available' });
    }

    // Check if the product already exists in the cart for the user
    const existingCartItem = await Cart.findOne({ userId, name, size });

    if (existingCartItem) {
      // If the item already exists, increment the quantity
      existingCartItem.quantity += 1;
      await existingCartItem.save();
      return res.json({ message: 'Product quantity updated in cart', cartItem: existingCartItem });
    } else {
      // If the item does not exist, create a new cart item
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
