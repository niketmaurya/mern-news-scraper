const dotenv = require("dotenv");
const connectDB = require("./config/db");
const scrapeHackerNews = require("./services/scraperService");
const app = require("./app");

dotenv.config();

connectDB();

scrapeHackerNews();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});