import { courses } from "../data/courses";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";

function Home() {
  const courses = [
    {
      id: "1",
      title: "Complete React Development",
      category: "Web Development",
      level: "Beginner",
      duration: "8 weeks",
      price: "₦15,000",
      rating: "4.9",
    },
    {
      id: "2",
      title: "UI/UX Design Masterclass",
      category: "Design",
      level: "Beginner",
      duration: "6 weeks",
      price: "₦12,000",
      rating: "4.8",
    },
    {
      id: "3",
      title: "Python Programming",
      category: "Programming",
      level: "Intermediate",
      duration: "10 weeks",
      price: "₦18,000",
      rating: "4.9",
    },
  ];

  const categories = [
    "Web Development",
    "UI/UX Design",
    "Data Science",
    "Cybersecurity",
    "Digital Marketing",
    "Programming",
  ];

  return (
    <div className="bg-gray-50">
      {/* HERO SECTION */}
      <section className="bg-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-indigo-200 font-semibold mb-4">
              LEARN SOMETHING NEW TODAY
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Unlock Your Potential With Online Learning
            </h1>

            <p className="text-indigo-100 text-lg mt-6 leading-relaxed">
              Discover new skills, learn from experienced instructors, and take
              the next step towards achieving your goals.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/courses"
                className="bg-white text-indigo-700 px-7 py-3 rounded-lg font-semibold hover:bg-indigo-100 transition"
              >
                Explore Courses
              </Link>

              <Link
                to="/register"
                className="border border-white px-7 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="bg-indigo-600 rounded-3xl p-12 text-center w-full">
              <span className="text-8xl">🎓</span>
              <h2 className="text-3xl font-bold mt-6">
                Your Learning Journey Starts Here
              </h2>
              <p className="text-indigo-200 mt-3">
                Learn at your own pace, anytime and anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section className="max-w-4xl mx-auto px-6 -mt-8 relative">
        <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="What do you want to learn?"
            className="flex-1 px-4 py-3 outline-none text-gray-700"
          />

          <Link
            to="/courses"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-center font-semibold hover:bg-indigo-700 transition"
          >
            Search Courses
          </Link>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <p className="text-indigo-600 font-semibold">EXPLORE CATEGORIES</p>

          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            Learn What Interests You
          </h2>

          <p className="text-gray-500 mt-3">
            Choose an area and start developing valuable skills.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {categories.map((category, index) => (
            <Link
              to="/courses"
              key={index}
              className="bg-white border border-gray-100 rounded-xl p-6 text-center font-semibold text-gray-700 hover:border-indigo-500 hover:text-indigo-600 hover:shadow-md transition"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      {/* POPULAR COURSES SECTION */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-10">
            <div>
              <p className="text-indigo-600 font-semibold">
                OUR POPULAR COURSES
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                Explore Our Top Courses
              </h2>

              <p className="text-gray-500 mt-3">
                Start learning with courses selected for you.
              </p>
            </div>

            <Link
              to="/courses"
              className="text-indigo-600 font-semibold hover:text-indigo-800"
            >
              View All Courses →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-indigo-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Start Learning?
          </h2>

          <p className="text-indigo-100 mt-4 text-lg">
            Join LearnHub today and take control of your learning journey.
          </p>

          <Link
            to="/register"
            className="inline-block mt-8 bg-white text-indigo-700 px-8 py-3 rounded-lg font-bold hover:bg-indigo-100 transition"
          >
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
