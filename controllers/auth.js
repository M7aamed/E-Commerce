const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const sendgrirTransport = require("nodemailer-sendgrid-transport");
const user = require("../models/user");

const transporter = nodemailer.createTransport(
  sendgrirTransport({
    auth: {
      api_key:
        "process.env.SENDGRID_API_KEY",
    },
  })
);

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
    errorMessage: message,
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
    errorMessage: message,
    oldInputs: {
        email: "",
        password: '',
        confirmPassword: '',
    }
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      isAuthenticated: false,
      errorMessage: errors.array()[0].msg,
    });
  }

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      req.flash("error", "Invalid Email Or Password");
      return res.redirect("/login");
    }
    bcrypt
      .compare(password, user.password)
      .then((doMatch) => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save((err) => {
            console.log(err);
            return res.redirect("/");
          });
        }
        req.flash("error", "Invalid Email Or Password");
        res.redirect("login");
      })
      .catch((err) => {
        console.log(err);
        res.redirect("login");
      });
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword= req.body.confirmPassword;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("auth/signup", {
      path: "/signup",
      pageTitle: "Signup",
      isAuthenticated: false,
      errorMessage: errors.array()[0].msg,
      oldInputs: {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      },
    });
  }
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        password: hashedPassword,
        cart: {
          items: [],
        },
      });
      return user.save();
    })
    .then((result) => {
      res.redirect("/login");
      return transporter.sendMail({
        to: email,
        from: "mohammedasharf8@gmail.com",
        subject: "SignUp Successed",
        html: "<h1> You Sign Up Successfully </h1>",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getreset = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    isAuthenticated: false,
    errorMessage: message,
  });
};

exports.postreset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash("error", "No Account With That Email ! ");
          return res.redirect("/reset");
        }
        user.resettoken = token;
        user.resettokenExpireation = Date.now() + 3600000; // +1 HOUR
        user.save();
      })
      .then((result) => {
        res.redirect("/");
        return transporter.sendMail({
          to: req.body.email,
          from: "mohammedasharf8@gmail.com",
          subject: "Password Reset",
          html: `
    <div style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 20px; text-align: center;">
      <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); padding: 30px;">
        
        <h2 style="color: #2c3e50; margin-bottom: 10px;">🔐 Password Reset</h2>
        <p style="color: #555; font-size: 16px; line-height: 1.6;">
          Hi there,<br>
          You recently requested to reset your password. No worries — it happens to the best of us .
        </p>

        <a href="http://localhost:3000/reset/${token}" 
          style="
            display: inline-block;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            font-weight: bold;
            padding: 12px 20px;
            border-radius: 6px;
            margin-top: 20px;
          ">
          Reset Your Password
        </a>

        <p style="color: #888; font-size: 13px; margin-top: 25px;">
          If you didn’t request this, you can safely ignore this email.
        </p>

        <hr style="margin: 25px 0; border: none; border-top: 1px solid #eee;">

        <p style="color: #aaa; font-size: 12px;">
          © 2025 Quiz App by Mohammed Ashraf.<br>
          All rights reserved.
        </p>
      </div>
    </div>
  `,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;

  User.findOne({
    resettoken: token,
    resettokenExpireation: { $gt: Date.now() },
  })
    .then((user) => {
      let message = req.flash("error");
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render("auth/new-password", {
        path: "/new-password",
        pageTitle: "New Password",
        isAuthenticated: false,
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  User.findOne({
    resettoken: passwordToken,
    resettokenExpireation: { $gt: Date.now() },
    _id: userId,
  })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedpassword) => {
      resetUser.password = hashedpassword;
      resetUser.resettoken = undefined;
      resetUser.resettokenExpireation = undefined;
      return resetUser.save();
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => {
      console.log(err);
    });
};
