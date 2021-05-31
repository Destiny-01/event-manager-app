const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = "WoAhhhH";
const expriry = 36000;

exports.registerNewUser = (req, res) => {
  User.findOne({ username: req.body.username }, (err, existingUser) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if (existingUser) {
      return res.status(400).json({ message: "username has been taken" });
    }
    User.create(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
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
                  username: newUser.username,
                },
                secret,
                { expiresIn: expriry },
                (err, token) => {
                  if (err) {
                    return res.status(500).json({ err });
                  }
                  return res.status(200).json({
                    message: "Welcome to the family ${req.body.username}",
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
