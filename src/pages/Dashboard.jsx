import { Link } from "react-router-dom";
import { courses } from "../data/courses";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, enrollments } = useAuth();

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

  const totalEnrolled = enrollments.length;

  const completedCourses = enrollments.filter(
    (enrollment) => enrollment.status === "Completed",
  ).length;

  const ongoingCourses = enrollments.filter(
    (enrollment) => enrollment.status === "In Progress",
  ).length;

  const stats = [
    {
      title: "Enrolled Courses",
      value: totalEnrolled,
      icon: "📚",
      color: "bg-blue-100",
    },
    {
      title: "Completed Courses",
      value: completedCourses,
      icon: "🏆",
      color: "bg-green-100",
    },
    {
      title: "Ongoing Courses",
      value: ongoingCourses,
      icon: "📖",
      color: "bg-purple-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* WELCOME SECTION */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-10">
          <div>
            <p className="text-indigo-600 font-semibold">STUDENT DASHBOARD</p>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Welcome back, {user?.fullName || "Student"}! 👋
            </h1>

            <p className="text-gray-500 mt-3">
              Here's an overview of your learning journey.
            </p>
          </div>

          <Link
            to="/courses"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition text-center"
          >
            Explore Courses
          </Link>
        </div>

        {/* STATISTICS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>

                  <h2 className="text-3xl font-bold text-gray-900 mt-3">
                    {stat.value}
                  </h2>
                </div>

                <div
                  className={`${stat.color} w-14 h-14 rounded-xl flex items-center justify-center text-2xl`}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LEARNING PROGRESS */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                My Learning Progress
              </h2>

              <p className="text-gray-500 mt-2">
                Keep track of the courses you're taking.
              </p>
            </div>

            <Link
              to="/my-learning"
              className="text-indigo-600 font-semibold hover:text-indigo-800"
            >
              View All
            </Link>
          </div>

          <div className="space-y-5">
            {myCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div>
                    <p className="text-sm text-indigo-600 font-semibold">
                      {course.category}
                    </p>

                    <h3 className="text-lg font-bold text-gray-900 mt-1">
                      {course.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Instructor: {course.instructor}
                    </p>
                  </div>

                  <span
                    className={`text-sm font-semibold px-4 py-2 rounded-full w-fit ${
                      course.progress === 100
                        ? "bg-green-100 text-green-700"
                        : "bg-indigo-100 text-indigo-700"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>

                {/* PROGRESS BAR */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Course Progress</span>

                    <span className="font-bold text-gray-900">
                      {course.progress}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-indigo-600 h-2.5 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <Link
                    to={`/courses/${course.id}`}
                    className="text-indigo-600 font-semibold text-sm hover:text-indigo-800"
                  >
                    Continue Learning →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/courses"
              className="bg-indigo-50 p-6 rounded-2xl hover:bg-indigo-100 transition"
            >
              <span className="text-3xl">🔍</span>

              <h3 className="font-bold text-gray-900 mt-4">Discover Courses</h3>

              <p className="text-gray-500 text-sm mt-2">
                Find new courses and develop your skills.
              </p>
            </Link>

            <Link
              to="/my-learning"
              className="bg-green-50 p-6 rounded-2xl hover:bg-green-100 transition"
            >
              <span className="text-3xl">📖</span>

              <h3 className="font-bold text-gray-900 mt-4">My Learning</h3>

              <p className="text-gray-500 text-sm mt-2">
                View all your enrolled courses.
              </p>
            </Link>

            <Link
              to="/courses"
              className="bg-purple-50 p-6 rounded-2xl hover:bg-purple-100 transition"
            >
              <span className="text-3xl">🚀</span>

              <h3 className="font-bold text-gray-900 mt-4">
                Improve Your Skills
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Keep learning and reach your goals.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
