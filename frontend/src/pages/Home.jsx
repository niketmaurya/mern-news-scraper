import React, { useEffect, useState } from 'react'
import API from "../api/axios";
import StoryCard from '../component/StoryCard';

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const fetchStories = async (page = 1) => {

    try {

      setLoading(true);

      const res = await API.get(
        `/stories?page=${page}&limit=${limit}`
      );

      setStories(res.data.stories);
      setCurrentPage(res.data.currentPage || page);
      setTotalPages(res.data.totalPages || 1);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchStories(currentPage);

  }, [currentPage]);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

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
                  refreshStories={() => fetchStories(currentPage)}
                />
              ))
            }

          </div>
        )
      }

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1 || loading}
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <span className="text-sm sm:text-base text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || loading}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

    </div>
  );
}

export default Home