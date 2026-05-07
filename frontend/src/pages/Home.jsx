import React, { useEffect, useState } from 'react'
import API from "../api/axios";
import StoryCard from '../component/StoryCard';

const Home = () => {
  const [stories, setStories] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchStories = async () => {

    try {

      setLoading(true);

      const res = await API.get(
        "/stories?page=1&limit=5"
      );

      setStories(res.data.stories);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchStories();

  }, []);

  return (

    <div className="max-w-6xl mx-auto px-4 py-5 sm:p-6">

      <h1 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-6">
        Top Hacker News Stories
      </h1>

      {
        loading ? (

          <h2 className="text-base sm:text-lg">Loading...</h2>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

            {
              stories.map((story) => (

                <StoryCard
                  key={story._id}
                  story={story}
                  refreshStories={fetchStories}
                />
              ))
            }

          </div>
        )
      }

    </div>
  );
}

export default Home