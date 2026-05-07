const express = require("express");

const {
  scrapeStories,
} = require("../controllers/scraperController");

const router = express.Router();

router.get("/", scrapeStories);

module.exports = router;