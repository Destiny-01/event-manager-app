const express = require("express");
const router = express.Router();
const EventCtrl = require("../controllers/eventController");
const {
  authenticateUser,
  checkIfAdmin,
} = require("../middlewares/authentication");

router.post("/events", authenticateUser, EventCtrl.createNewEvent);

router.get("/events", authenticateUser, EventCtrl.fetchEvents);

router.get("/events/:id", authenticateUser, EventCtrl.fetchSingleEvent);

router.put(
  "/events/:id",
  authenticateUser,
  checkIfAdmin,
  EventCtrl.updateSingleEvent
);

router.delete(
  "/events/:id",
  authenticateUser,
  checkIfAdmin,
  EventCtrl.deleteSingleEvent
);

module.exports = router;
