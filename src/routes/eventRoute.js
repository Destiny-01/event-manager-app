const express = require("express");
const router = express.Router();
const EventCtrl = require("../controllers/eventController");

router.post("/events", EventCtrl.createNewEvent);

router.get("/events", EventCtrl.fetchEvents);

router.get("/events/:id", EventCtrl.fetchSingleEvent);

router.put("/events/:id", EventCtrl.updateSingleEvent);

router.delete("/events/:id", EventCtrl.deleteSingleEvent);

module.exports = router;
