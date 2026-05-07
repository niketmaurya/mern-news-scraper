const Story = require("../models/Story");
const User = require("../models/User");

const getStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ points: -1 });

    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSingleStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const toggleBookmark = async (req, res) => {

    try {

        const storyId = req.params.id;

        const user = await User.findById(req.user._id);

        const alreadyBookmarked = user.bookmarks.some(
          (id) => id.toString() === storyId
        );

        if (alreadyBookmarked) {

            user.bookmarks = user.bookmarks.filter(
                (id) => id.toString() !== storyId
            );

        } else {

            user.bookmarks.push(storyId);
        }

        await user.save();

        res.status(200).json({
            message: alreadyBookmarked
                ? "Bookmark removed"
                : "Bookmark added",
            bookmarks: user.bookmarks,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};

const getBookmarkedStories = async (req, res) => {

  try {

      const user = await User.findById(req.user._id)
          .populate("bookmarks");

      res.status(200).json(user.bookmarks);

  } catch (error) {

      res.status(500).json({
          message: error.message,
      });
  }
};

module.exports = {
  getStories,
  getSingleStory,
  toggleBookmark,
  getBookmarkedStories,
};