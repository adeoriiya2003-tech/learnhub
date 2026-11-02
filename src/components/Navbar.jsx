import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
    navigate("/");
  }

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          LearnHub
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-600 hover:text-indigo-600">
            Home
          </Link>

          <Link to="/courses" className="text-gray-600 hover:text-indigo-600">
            Courses
          </Link>

          {user && (
            <>
              <Link
                to="/my-learning"
                className="text-gray-600 hover:text-indigo-600"
              >
                My Learning
              </Link>

              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-indigo-600"
              >
                Dashboard
              </Link>
            </>
          )}
        </div>

        {/* Authentication Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden sm:block text-sm font-semibold text-gray-700">
                Hi, {user.fullName.split(" ")[0]}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 font-semibold hover:text-indigo-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
