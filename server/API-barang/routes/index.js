const express = require("express");
const router = express.Router();


//product
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

//cart
const addtoCart = require("../controllers/addCart.js")
const readCart = require("../controllers/getCart.js")

router.post("/cart",addtoCart);
router.get("/cart/:userId",readCart)



module.exports = router;