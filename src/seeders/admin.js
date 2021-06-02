const User = require("../models/user");
const bcrypt = require("bcryptjs");
let password = "123admin456";

exports.seedAdmin = () => {
  User.findOne({ role: "admin" }, (err, admin) => {
    if (err) throw err;
    if (admin) {
      return "admin account already exists";
    }
    User.create(
      {
        firstname: "Jack",
        lastname: "Mah",
        email: "jackmah@jack.com",
        role: "admin",
      },
      (err, user) => {
        if (err) throw err;
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user.save((err, savedUser) => {
              if (err) throw err;
              return "admin account created";
            });
          });
        });
      }
    );
  });
};
