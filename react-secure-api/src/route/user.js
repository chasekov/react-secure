// Importing modules
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/user");

// User login api
router.post("/login", (req, res) => {
  User.findOne({ name: req.body.name }, function (err, user) {
    if (user === null) {
      return res.status(400).send({
        error: "User not found.",
      });
    } else {
      if (user.validPassword(req.body.password)) {
        const token = jwt.sign(
          { sub: user.id, name: user.name },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        return res.status(201).send({
          message: "User Logged In",
          token,
        });
      } else {
        return res.status(400).send({
          error: "Wrong Password",
        });
      }
    }
  });
});

// User signup api
router.post("/signup", (req, res) => {
  let newUser = new User();
  newUser.name = req.body.name;
  newUser.password = req.body.password;

  newUser.setPassword(req.body.password);
  newUser.save((err, User) => {
    if (err) {
      return res.status(400).send({
        error: "Failed to add user.",
      });
    } else {
      return res.status(201).send({
        message: "User added successfully.",
      });
    }
  });
});

router.get("/profile", (req, res) => {
  if (req.user === null) {
    return res.status(400).json({ error: "Error token invalid" });
  } else {
    return res.status(201).json({ message: "Success", user: req.user });
  }
});

module.exports = router;
