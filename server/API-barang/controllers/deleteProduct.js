const Product = require("../models/barangDB.js");
const fs = require('fs');

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    
    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Delete the product image from the file system
    fs.unlinkSync(`./assets/${product.image}`);

    // Delete the product from the database
    await product.remove();

    res.json("Product deleted successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

module.exports = deleteProduct;

