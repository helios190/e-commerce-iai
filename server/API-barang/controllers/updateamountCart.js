const Cart = require('../models/cartDB.js');

const updateCartQuantity = async (req, res) => {
  const { userId, name, size, operation } = req.body;

  if (!userId || !name || !size || !operation) {
    return res.status(400).json({ error: 'User ID, name, size, and operation are required' });
  }

  try {
    // Find the cart item by userId, name, and size
    const cartItem = await Cart.findOne({ userId, name, size });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    if (operation === 'increment') {
      cartItem.quantity += 1;
    } else if (operation === 'decrement') {
      cartItem.quantity -= 1;
      if (cartItem.quantity <= 0) {
        await cartItem.remove();
        return res.json({ message: 'Cart item removed as quantity became zero or less', cartItem });
      }
    } else {
      return res.status(400).json({ error: 'Invalid operation. Use "increment" or "decrement"' });
    }

    await cartItem.save();
    return res.json({ message: 'Cart item quantity updated', cartItem });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to update cart item quantity' });
  }
};

module.exports = updateCartQuantity;
