const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  getStories,
  getSingleStory,
  toggleBookmark,
} = require("../controllers/storyController");

const router = express.Router();

router.get("/", getStories);

router.get("/:id", getSingleStory);

router.post("/:id/bookmark", protect, toggleBookmark);

module.exports = router;