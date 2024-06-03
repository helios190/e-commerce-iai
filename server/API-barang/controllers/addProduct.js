const Product = require("../models/barangDB.js");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the upload directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)){
  fs.mkdirSync(uploadDir);
}

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename based on timestamp and product title
    const uniqueFilename = `${Date.now()}-${req.body.title.replace(/\s/g, '_')}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  }
});

const upload = multer({ storage: storage }).single('file');

const createNewProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Failed to upload file' });
    }

    const { title, description, quantity, price } = req.body;

    // Validate required fields
    if (!title || !description || !quantity || !price) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Construct the product object
    let newProduct = new Product({
      title,
      description,
      quantity,
      price,
      // Store the generated filename
      image: `uploads/${req.file.filename}`
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
