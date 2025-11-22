<<<<<<< HEAD
const path = require("path");

const express = require("express");
const adminController = require("../controllers/admin");
const { check, body } = require('express-validator');


const router = express.Router();

const isAuth = require("../middleware/is-Auth");

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("imageUrl").isURL(),
    body("price").isFloat(),
    body("description").isString().isLength({ min: 10, max: 400 }).trim(),
  ],
  isAuth,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("imageUrl").isURL(),
    body("price").isFloat(),
    body("description").isString().isLength({ min: 10, max: 400 }).trim(),
  ],
  isAuth,
  adminController.postEditProduct
);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);
=======
const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

const isAuth = require('../middleware/is-Auth');

// /admin/add-product => GET
router.get('/add-product',isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products',isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product',isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId',isAuth, adminController.getEditProduct);

router.post('/edit-product',isAuth, adminController.postEditProduct);

router.post('/delete-product',isAuth, adminController.postDeleteProduct);
>>>>>>> 88515b20c13a537eb1b285bf2e12233ef9bca79b

module.exports = router;
