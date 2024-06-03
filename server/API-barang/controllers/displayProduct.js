const Product = require("../models/barangDB.js");

const displayProductInfo = async (req, res) => {
  try {
    const id = req.params.id || req.query.id;
    const product = await Product.findOne({ _id: id });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const productInfo = {
      id: product._id,
      title: product.title,
      description: product.description,
      quantity: product.quantity,
      price: product.price,
      image: product.image
    };

    res.json(productInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = displayProductInfo;
