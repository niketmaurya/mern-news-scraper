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

    <nav className="bg-white shadow-md px-6 py-4">

      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          HackerNews
        </Link>

        {/* Navigation */}

        <div className="flex items-center gap-4">

          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>

          {
            user && (

              <Link
                to="/bookmarks"
                className="text-gray-700 hover:text-blue-600"
              >
                Bookmarks
              </Link>
            )
          }

          {
            user ? (

              <>

                <span className="text-sm font-medium text-gray-600">

                  {user.name}

                </span>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Logout
                </button>

              </>

            ) : (

              <>

                <Link
                  to="/login"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
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