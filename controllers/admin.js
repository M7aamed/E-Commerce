<<<<<<< HEAD
const { validationError } = require("sequelize");
const Product = require("../models/product");
const { validationResult } = require("express-validator");
=======
const Product = require("../models/product");
>>>>>>> 88515b20c13a537eb1b285bf2e12233ef9bca79b

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
<<<<<<< HEAD
    errorMessage: null,
    hasError: false,
    validationErrors: [],
=======
>>>>>>> 88515b20c13a537eb1b285bf2e12233ef9bca79b
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
<<<<<<< HEAD

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/edit-product",
      editing: false,
      hasError: true,
      product: {
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
      },

      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }
=======
>>>>>>> 88515b20c13a537eb1b285bf2e12233ef9bca79b
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user,
  });
  product
    .save()
    .then((result) => {
      // console.log(result);
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
<<<<<<< HEAD
        hasError: false,
        errorMessage: null,
        product: product,
        validationErrors: [],
=======
        product: product,
>>>>>>> 88515b20c13a537eb1b285bf2e12233ef9bca79b
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

<<<<<<< HEAD
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: true,
      hasError: true,
      product: {
        title: updatedTitle,
        imageUrl: updatedImageUrl,
        price: updatedPrice,
        description: updatedDesc,
        _id: prodId,
      },

      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

=======
>>>>>>> 88515b20c13a537eb1b285bf2e12233ef9bca79b
  Product.findById(prodId)
    .then((product) => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect("/");
<<<<<<< HEAD
      }
=======
      } 
>>>>>>> 88515b20c13a537eb1b285bf2e12233ef9bca79b
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
<<<<<<< HEAD
      return product.save().then((result) => {
=======
      return product.save()
        .then((result) => {
>>>>>>> 88515b20c13a537eb1b285bf2e12233ef9bca79b
        console.log("UPDATED PRODUCT!");
        res.redirect("/admin/products");
      });
    })
    .catch((err) => console.log(err));
<<<<<<< HEAD
=======
  
>>>>>>> 88515b20c13a537eb1b285bf2e12233ef9bca79b
};

exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then((products) => {
      console.log(products);
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
<<<<<<< HEAD
  Product.deleteOne({ _id: prodId, userId: req.user._id })
=======
  Product.deleteOne({_id:prodId , userId:req.user._id})
>>>>>>> 88515b20c13a537eb1b285bf2e12233ef9bca79b
    .then(() => {
      console.log("DESTROYED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
