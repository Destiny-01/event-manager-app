const mongoose = require("mongoose");

const url = `mongodb+srv://aigbe_destiny:Destiny1@cluster0.7bohx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
module.exports = () => {
  mongoose
    .connect(url, connectionParams)
    .then(() => {
      console.log("Connected to database ");
    })
    .catch((err) => {
      console.error(`Error connecting to the database. \n${err}`);
    });
};
