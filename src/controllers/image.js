const request = require("request");
let link;

exports.image = (category) => {
  request(
    `https://imagegen.herokuapp.com/?category=${category}`,
    { json: true },
    (err, res, body) => {
      if (err) {
        console.log(err);
        return null;
      }
      return body.image;
    }
  );
};
