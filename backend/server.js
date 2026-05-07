const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const scrapeHackerNews = require("./services/scraperService");
const storyRoutes = require('./routes/storyRoutes');
const scraperRoutes = require('./routes/scraperRoutes');

dotenv.config();

connectDB();

scrapeHackerNews();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/stories', storyRoutes);
app.use('/api/scrape', scraperRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});