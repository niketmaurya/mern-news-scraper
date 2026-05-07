import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {

    logout();

    navigate("/login");
  };

  return (

    <nav className="bg-white shadow-md px-4 py-3 sm:px-6 sm:py-4">

      <div className="max-w-7xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        {/* Logo */}

        <Link
          to={user ? "/home" : "/login"}
          className="text-xl sm:text-2xl font-bold text-blue-600"
        >
          HackerNews
        </Link>

        {/* Navigation */}

        <div className="w-full sm:w-auto flex flex-wrap items-center gap-2 sm:gap-4">

          <Link
            to="/home"
            className="text-sm sm:text-base text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>

          {
            user && (

              <Link
                to="/bookmarks"
                className="text-sm sm:text-base text-gray-700 hover:text-blue-600"
              >
                Bookmarks
              </Link>
            )
          }

          {
            user ? (

              <>

                <span className="text-sm font-medium text-gray-600 max-w-28 sm:max-w-none truncate">

                  {user.name}

                </span>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 sm:px-4 rounded-lg text-sm sm:text-base"
                >
                  Logout
                </button>

              </>

            ) : (

              <>

                <Link
                  to="/login"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 sm:px-4 rounded-lg text-sm sm:text-base"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 sm:px-4 rounded-lg text-sm sm:text-base"
                >
                  Register
                </Link>

              </>
            )
          }

        </div>

      </div>

    </nav>
  );
}

export default Navbar;