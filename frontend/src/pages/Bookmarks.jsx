import React, { useContext, useEffect, useState } from 'react'
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import StoryCard from '../component/StoryCard';

const Bookmarks = () => {
  const { user } = useContext(AuthContext);

  const [stories, setStories] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchBookmarks = async () => {

    try {

      setLoading(true);

      const res = await API.get(
        "/stories/bookmarks",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setStories(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchBookmarks();

  }, []);

  return (

    <div className="max-w-6xl mx-auto px-4 py-5 sm:p-6">

      <h1 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-6">
        Bookmarked Stories
      </h1>

      {
        loading ? (

          <h2 className="text-base sm:text-lg">Loading...</h2>

        ) : stories.length === 0 ? (

          <h2 className="text-base sm:text-lg">No bookmarks found</h2>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

            {
              stories.map((story) => (

                <StoryCard
                  key={story._id}
                  story={story}
                  refreshStories={fetchBookmarks}
                />
              ))
            }

          </div>
        )
      }

    </div>
  );
}

export default Bookmarks;