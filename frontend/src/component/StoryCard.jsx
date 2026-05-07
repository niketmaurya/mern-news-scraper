import React, { useContext } from "react";
import API from "../api/axios";

import { AuthContext } from "../context/AuthContext";

const StoryCard = ({ story, refreshStories }) => {
  const { user } = useContext(AuthContext);

  const handleBookmark = async () => {

    try {

      await API.post(
        `/stories/${story._id}/bookmark`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Bookmark updated");

      if (refreshStories) {
        refreshStories();
      }

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Error bookmarking story"
      );
    }
  };

  return (

    <div className="bg-white p-5 rounded-2xl shadow-md">

      <h2 className="text-xl font-bold mb-2">
        {story.title}
      </h2>

      <a
        href={story.url}
        target="_blank"
        className="text-blue-600 break-all"
      >
        {story.url}
      </a>

      <div className="mt-3 text-sm text-gray-600 space-y-1">

        <p>
          <span className="font-semibold">
            Points:
          </span>{" "}
          {story.points}
        </p>

        <p>
          <span className="font-semibold">
            Author:
          </span>{" "}
          {story.author}
        </p>

        <p>
          <span className="font-semibold">
            Posted:
          </span>{" "}
          {story.postedAt}
        </p>

      </div>

      {
        user && (

          <button
            onClick={handleBookmark}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Bookmark
          </button>
        )
      }

    </div>
  );
}


export default StoryCard;