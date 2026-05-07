const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  getStories,
  getSingleStory,
  toggleBookmark,
  getBookmarkedStories,
} = require("../controllers/storyController");

const router = express.Router();

router.get("/", getStories);

router.get("/bookmarks", protect, getBookmarkedStories);

router.get("/:id", getSingleStory);

router.post("/:id/bookmark", protect, toggleBookmark);


module.exports = router;