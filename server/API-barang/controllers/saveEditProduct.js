const Product = require("../models/barangDB.js");

const saveEditProduct = async (req, res) => {
  const id = req.params.id || req.query.id;
  const title = req.body.title;
  const description = req.body.description;
  const quantity = req.body.quantity;
  const price = req.body.price;
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      { title, description, quantity, price },
      { new: true } // Make sure to include this option to get the updated document
    );

    if (!updatedProduct) {
      // If no document was found with the given id
      return res.status(404).json({ error: "Product not found" });
    }

    // Respond with the updated product
    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = saveEditProduct;