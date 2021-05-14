const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017";

module.exports = () => {
  mongoose.connect(
    connectionString,
    {
      useNewURIParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    (err) =>
      err ? console.log(err) : console.log("database connection successful")
  );
};
