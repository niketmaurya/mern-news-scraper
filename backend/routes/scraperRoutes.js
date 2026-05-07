const express = require("express");

const {
  scrapeStories,
} = require("../controllers/scraperController");

const router = express.Router();

router.post("/", scrapeStories);

module.exports = router;