import React, { useContext, useEffect, useState } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const StoryCard = ({ story, refreshStories }) => {

    const { user, updateBookmarks } = useContext(AuthContext);

    const [bookmarked, setBookmarked] = useState(false);

    useEffect(() => {

        const isBookmarked = user?.bookmarks?.some(
            (id) => id?.toString() === story._id?.toString()
        );

        setBookmarked(Boolean(isBookmarked));

    }, [user, story._id]);

    const handleBookmark = async () => {

        if (!user?.token) {
            return alert("Please login first");
        }

        try {

            const res = await API.post(
                `/stories/${story._id}/bookmark`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            if (res.data?.bookmarks) {
                updateBookmarks(
                    res.data.bookmarks.map((id) => id.toString())
                );
            } else {
                setBookmarked((prev) => !prev);
            }

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

        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-md">

            <h2 className="text-lg sm:text-xl font-bold mb-2 leading-snug">
                {story.title}
            </h2>

            <a
                href={story.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 break-all text-sm sm:text-base"
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
                        className={`mt-4 text-white px-4 py-2 rounded-lg cursor-pointer transition duration-200 text-sm sm:text-base ${
                            bookmarked
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >

                        {
                            bookmarked
                                ? "Remove Bookmark"
                                : "Bookmark"
                        }

                    </button>
                )
            }

        </div>
    );
};

export default StoryCard;