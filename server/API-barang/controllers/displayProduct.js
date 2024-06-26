const Product = require("../models/barangDB.js");

const displayProductInfo = async (req, res) => {
  try {
    const name = req.params.name || req.query.name;
    const product = await Product.findOne({ name: name });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const productInfo = {
      id: product._id,
      name: product.name,
      size: product.size,
      price: product.price,
      image: product.image,
    };

    res.json(productInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = displayProductInfo;
