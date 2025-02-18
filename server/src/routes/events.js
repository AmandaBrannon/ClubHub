const express = require("express");
const { createEvent, getAllEvents } = require("../controllers/events");
const { userAuth } = require("../middlewares/auth-middleware");

const router = express.Router();

router.post("/create-events", userAuth, createEvent);
router.get("/get-events", userAuth, getAllEvents);

module.exports = router;
