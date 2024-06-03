const Product = require("../models/barangDB.js");

const displayAllProducts = async (req, res) => {
  try {
    let products = await Product.find({});

    let results = products.map((each) => {
      return {
        id: each._id,
        title: each.title,
        description: each.description,
        quantity: each.quantity,
        price: each.price,
        image:each.image,
      };
    });

    res.json(results);
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};

module.exports = displayAllProducts;