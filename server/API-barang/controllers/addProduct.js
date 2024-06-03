const Product = require("../models/barangDB.js");
const multer = require('multer');
const path = require('path');
const { GridFsStorage } = require("multer-gridfs-storage")
const fs = require('fs');

const url ='mongodb+srv://bintangrestub:ZQbRY9ruiQ1KXEPC@cluster0.ghm6lt6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'


const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "_" + uniqueSuffix + "_" + file.originalname);
  },
});
const upload = multer({ storage }).single("image");


const createNewProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Failed to upload file' });
    }

    const { title, description, quantity, price } = req.body;

    // Construct the product object
    let newProduct = new Product({
      title,
      description,
      quantity,
      price,
      image : req.file.filename,
    });

    try {
      await newProduct.save();
      res.json("Product created successfully!");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  });
};

module.exports = createNewProduct;
