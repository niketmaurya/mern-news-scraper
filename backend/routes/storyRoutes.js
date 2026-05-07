const express = require("express");

const {
  getStories,
  getSingleStory,
} = require("../controllers/storyController");

const router = express.Router();

router.get("/", getStories);

router.get("/:id", getSingleStory);

module.exports = router;