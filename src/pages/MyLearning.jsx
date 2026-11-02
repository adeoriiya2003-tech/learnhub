import { useState } from "react";
import { Link } from "react-router-dom";
import { courses } from "../data/courses";
import { useAuth } from "../context/AuthContext";

function MyLearning() {
  const { enrollments } = useAuth();
  const [activeFilter, setActiveFilter] = useState("All");

  // Combine enrollment information with course information
  const myCourses = enrollments
    .map((enrollment) => {
      const course = courses.find((item) => item.id === enrollment.courseId);

      if (!course) return null;

      return {
        ...course,
        ...enrollment,
      };
    })
    .filter(Boolean);

  // Filter courses based on their status
  const filteredCourses = myCourses.filter((course) => {
    if (activeFilter === "All") return true;

    if (activeFilter === "Completed") {
      return course.progress === 100;
    }

    if (activeFilter === "In Progress") {
      return course.progress < 100;
    }

    return true;
  });

  const filters = ["All", "In Progress", "Completed"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* PAGE HEADER */}
      <section className="bg-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-indigo-200 font-semibold">YOUR LEARNING SPACE</p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">My Learning</h1>

          <p className="text-indigo-100 mt-4 max-w-2xl">
            Manage your enrolled courses, track your progress, and continue
            where you left off.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* SUMMARY CARDS */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-sm">Total Enrolled</p>

            <h2 className="text-3xl font-bold text-gray-900 mt-3">
              {myCourses.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-sm">In Progress</p>

            <h2 className="text-3xl font-bold text-indigo-600 mt-3">
              {myCourses.filter((course) => course.progress < 100).length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-sm">Completed</p>

            <h2 className="text-3xl font-bold text-green-600 mt-3">
              {myCourses.filter((course) => course.progress === 100).length}
            </h2>
          </div>
        </div>

        {/* COURSE FILTERS */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-5 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Courses</h2>

            <p className="text-gray-500 mt-2">
              Continue developing your skills.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition ${
                  activeFilter === filter
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-500"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* ENROLLED COURSE LIST */}
        {filteredCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition"
              >
                {/* COURSE IMAGE PLACEHOLDER */}
                <div className="h-40 bg-indigo-100 flex items-center justify-center">
                  <span className="text-6xl">📚</span>
                </div>

                <div className="p-6">
                  <p className="text-sm text-indigo-600 font-semibold">
                    {course.category}
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mt-2">
                    {course.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    Instructor: {course.instructor}
                  </p>

                  {/* COURSE PROGRESS */}
                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Your Progress</span>

                      <span className="font-bold text-gray-900">
                        {course.progress}%
                      </span>
                    </div>

                    <div className="w-full h-2.5 bg-gray-200 rounded-full">
                      <div
                        className="h-2.5 bg-indigo-600 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* COURSE STATUS */}
                  <div className="flex justify-between items-center mt-5">
                    <span
                      className={`text-xs font-semibold px-3 py-2 rounded-full ${
                        course.progress === 100
                          ? "bg-green-100 text-green-700"
                          : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {course.status}
                    </span>

                    <span className="text-xs text-gray-400">
                      Last accessed: {course.lastAccessed}
                    </span>
                  </div>

                  {/* ACTION BUTTON */}
                  <Link
                    to={`/courses/${course.id}`}
                    className="block text-center bg-indigo-600 text-white py-3 rounded-lg font-semibold mt-6 hover:bg-indigo-700 transition"
                  >
                    {course.progress === 100
                      ? "Review Course"
                      : "Continue Learning"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <span className="text-5xl">📖</span>

            <h3 className="text-xl font-bold text-gray-900 mt-4">
              No courses found
            </h3>

            <p className="text-gray-500 mt-2">
              There are no courses in this category yet.
            </p>

            <button
              onClick={() => setActiveFilter("All")}
              className="mt-6 text-indigo-600 font-semibold hover:text-indigo-800"
            >
              Show All Courses
            </button>
          </div>
        )}

        {/* EXPLORE MORE */}
        <div className="bg-indigo-50 rounded-2xl p-8 mt-12 flex flex-col md:flex-row justify-between md:items-center gap-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Looking for something new?
            </h2>

            <p className="text-gray-600 mt-2">
              Explore more courses and discover your next skill.
            </p>
          </div>

          <Link
            to="/courses"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-indigo-700 transition"
          >
            Explore Courses
          </Link>
        </div>
      </section>
    </div>
  );
}

export default MyLearning;
