import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, login } = useContext(AuthContext);

  useEffect(() => {

    if (user) {
        navigate("/");
    }

}, [user, navigate]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      login(res.data);
      setEmail("");
      setPassword("");

      alert("Login successful");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">

      <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-5 sm:mb-6">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>

            <label className="block mb-1 font-medium">
              Email <span className='text-red-500'>*</span>
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          <div>

            <label className="block mb-1 font-medium">
              Password <span className='text-red-500'>*</span>
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200 cursor-pointer"
          >

            {
              loading
                ? "Logging in..."
                : "Login"
            }

          </button>

        </form>

        <p className="text-center text-sm mt-4">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Create Account
          </Link>

        </p>
      </div>

    </div>
  );

}

export default Login