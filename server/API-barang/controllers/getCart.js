const Cart = require('../models/cartDB.js');

const getCartByUserId = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const cartItems = await Cart.find({ userId });

    if (!cartItems.length) {
      return res.status(404).json({ message: 'No items found in cart' });
    }

    return res.json(cartItems);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to fetch cart items' });
  }
};

module.exports = getCartByUserId;
