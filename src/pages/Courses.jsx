import { useState } from "react";
import CourseCard from "../components/CourseCard";
import { courses } from "../data/courses";

function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Web Development",
    "UI/UX Design",
    "Programming",
    "Cybersecurity",
    "Data Science",
    "Digital Marketing",
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* PAGE HEADER */}
      <section className="bg-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-indigo-200 font-semibold">EXPLORE LEARNHUB</p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Discover Your Next Course
          </h1>

          <p className="text-indigo-100 mt-4 max-w-2xl">
            Explore our collection of courses and find the skills you need to
            achieve your goals.
          </p>
        </div>
      </section>

      {/* COURSE CATALOGUE */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* SEARCH AND FILTER */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-10">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Courses
              </label>

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by course name or category..."
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Category
              </label>

              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* COURSE COUNT */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Available Courses
          </h2>

          <p className="text-gray-500 text-sm">
            {filteredCourses.length} courses found
          </p>
        </div>

        {/* COURSE CARDS */}
        {filteredCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center">
            <span className="text-5xl">🔍</span>

            <h3 className="text-xl font-bold text-gray-800 mt-4">
              No courses found
            </h3>

            <p className="text-gray-500 mt-2">
              Try another search term or select a different category.
            </p>

            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Courses;
