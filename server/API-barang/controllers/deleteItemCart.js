const Cart = require('../models/cartDB.js');

const deleteProductFromCart = async (req, res) => {
  const { userId, name } = req.body;

  if (!userId || !name) {
    return res.status(400).json({ error: 'User ID and product name are required' });
  }

  try {
    await Cart.deleteMany({ userId, name });
    return res.json({ message: 'All cart items with the specified product name deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to delete cart items' });
  }
};

module.exports = deleteProductFromCart;
