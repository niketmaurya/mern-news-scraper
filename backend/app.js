const express = require("express");
const cors = require("cors");

const storyRoutes = require("./routes/storyRoutes");
const scraperRoutes = require("./routes/scraperRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

const allowedOrigin = process.env.FRONTEND_URL || "*";

app.use(
  cors({
    origin: allowedOrigin,
  })
);
app.use(express.json());

app.use("/api/stories", storyRoutes);
app.use("/api/scrape", scraperRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (_req, res) => {
  res.send("API running");
});

module.exports = app;
