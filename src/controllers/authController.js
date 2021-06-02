const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = "WoAhhhH";
const expriry = 36000;

exports.registerNewUser = (req, res) => {
  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if (existingUser) {
      return res.status(400).json({ message: "email has been taken" });
    }
    User.create(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
      },
      (err, newUser) => {
        if (err) {
          return res.status(500).json({ err });
        }
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            return res.status(500).json({ err });
          }
          bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
            newUser.password = hashedPassword;
            newUser.save((err, savedUser) => {
              if (err) {
                return res.status(500).json({ err });
              }
              jwt.sign(
                {
                  id: newUser._id,
                  firstname: newUser.firstname,
                  lastname: newUser.lastname,
                  email: newUser.email,
                },
                secret,
                { expiresIn: expriry },
                (err, token) => {
                  if (err) {
                    return res.status(500).json({ err });
                  }
                  return res.status(200).json({
                    message: `Welcome to the family ${req.body.firstname} ${req.body.lastname}`,
                    token,
                  });
                }
              );
            });
          });
        });
      }
    );
  });
};

exports.loginuser = (req, res) => {
  User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if (!foundUser) {
      return res.status(401).json({ message: "incorrect email" });
    }
    let match = bcrypt.compareSync(req.body.password, foundUser.password);
    if (!match) {
      return res.status(401).json({ message: "incorrect password" });
    }
    jwt.sign(
      {
        id: foundUser._id,
        email: foundUser.email,
        firstname: foundUser.firstname,
        lastname: foundUser.lastname,
      },
      secret,
      {
        expiresIn: expriry,
      },
      (err, token) => {
        if (err) {
          return res.status(500).json({ err });
        }
        return res
          .status(200)
          .json({ message: "user logged in successfully", token });
      }
    );
  });
};
