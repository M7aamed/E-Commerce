const express = require("express");
const { check, body } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.get("/login", authController.getLogin);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please Enter Valid Email .")
    .normalizeEmail(),
    body("password", "Please Enter a Valid Password ")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

router.get("/signup", authController.getSignup);
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please Enter Valid Email .")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "E-mail Exists already , Please Pick Another One"
            );
          }
        });
      })
      .normalizeEmail(),
    body("password", "Please Enter a Valid Password ")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password Have To Match!");
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.get("/reset", authController.getreset);
router.post("/reset", authController.postreset);

router.post("/logout", authController.postLogout);

router.get("/reset/:token", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);

module.exports = router;
