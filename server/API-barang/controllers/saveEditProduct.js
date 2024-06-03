const Product = require("../models/barangDB.js");

const saveEditProduct = async (req, res) => {
  const id = req.params.id || req.query.id;
  const newSize = req.body.size;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update the sizes without resetting unspecified sizes to 0
    const updatedSize = { ...product.size, ...newSize };

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      { size: updatedSize },
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = saveEditProduct;
