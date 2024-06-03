const express = require("express");
const router = express.Router();

//Routes
const displayAllProducts = require("../controllers/displayAllProduct.js");
const displayProductInfo = require("../controllers/displayProduct");
const createNewProduct = require("../controllers/addProduct.js");
const saveEditProduct = require("../controllers/saveEditProduct.js");
const deleteProduct = require("../controllers/deleteProduct.js");


router.get("/product", displayAllProducts);
router.get("/product/:id", displayProductInfo);
router.post("/product", createNewProduct);
router.post("/product/edit/:id", saveEditProduct);
router.delete("/product/delete/:id", deleteProduct);


module.exports = router;