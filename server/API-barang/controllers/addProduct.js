const Product = require("../models/barangDB.js");
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const uploadDir = '/tmp/assets';
if (!fs.existsSync(uploadDir)){
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {

    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).single('file');

const createNewProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Failed to upload file' });
    }

    const { name, size, quantity, price } = req.body;

    if (!name || !size || !price) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    let newProduct = new Product({
      name,
      size,
      price,
      image: `./tmp/assets/${req.file.originalname}`
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
