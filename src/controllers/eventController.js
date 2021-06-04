const Event = require("../models/event");
const request = require("request");
const { image } = require("./image");

exports.createNewEvent = (req, res) => {
  let imageUrl = image(req.body.category);
  console.log(imageUrl);
  Event.create(
    {
      ...req.body,
    },
    (err, newEvent) => {
      if (err) {
        return res.status(500).json({ message: err });
      } else {
        request(
          `https://imagegen.herokuapp.com/?category=${req.body.category}`,
          { json: true },
          (err, response, body) => {
            if (err) {
              return res.status(500).json({ message: err });
            }
            newEvent.image = body.image;
            newEvent.save((err, savedImage) => {
              if (err) {
                return res.status(500).json({ message: err });
              }
              return res
                .status(200)
                .json({ message: "image added successfully", savedImage });
            });
          }
        );
      }
    }
  );
};

exports.fetchEvents = (req, res) => {
  let conditions = {};
  if (req.query.category) {
    conditions.category = req.query.category;
  }
  Event.find(conditions, (err, events) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else {
      return res.status(200).json({ events });
    }
  });
};

exports.fetchSingleEvent = (req, res) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else if (!event) {
      return res.status(404).json({ message: "event not found" });
    } else {
      return res.status(200).json({ event });
    }
  });
};

exports.updateSingleEvent = (req, res) => {
  Event.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
    },
    (err, event) => {
      if (err) {
        return res.status(500).json({ message: err });
      } else if (!event) {
        return res.status(404).json({ message: "event not found" });
      } else {
        event.save((err, savedEvent) => {
          if (err) {
            return res.status(500).json({ message: err });
          } else {
            return res
              .status(200)
              .json({ message: "event updated successfully" });
          }
        });
      }
    }
  );
};

exports.deleteSingleEvent = (req, res) => {
  Event.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
    },
    (err, event) => {
      if (err) {
        return res.status(500).json({ message: err });
      } else if (!event) {
        return res.status(404).json({ message: "event not found" });
      } else {
        event.save((err, savedEvent) => {
          if (err) {
            return res.status(500).json({ message: err });
          } else {
            return res
              .status(200)
              .json({ message: "event updated successfully" });
          }
        });
      }
    }
  );
};
