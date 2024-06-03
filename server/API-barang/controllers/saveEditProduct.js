const Product = require("../models/barangDB.js");

const saveEditProduct = async (req, res) => {
  const id = req.params.id || req.query.id;
  const size = req.body.size;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      { $set: { size } },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = saveEditProduct;
