import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { courses } from "../data/courses";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, enrollments, enrollInCourse } = useAuth();

  const isEnrolled = enrollments.some(
    (enrollment) => enrollment.courseId === id
  );

  function handleEnroll() {
    if (!user) {
      navigate("/login");
      return;
    }

    const result = enrollInCourse(id);

    if (result.success) {
      alert("You have successfully enrolled in this course!");
    } else {
      alert(result.message);
    }
  }

  const course = courses.find((item) => item.id === id);

  // Handle invalid course IDs
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
        <h1 className="text-4xl font-bold text-gray-900">Course Not Found</h1>

        <p className="text-gray-500 mt-3">
          Sorry, we couldn't find the course you're looking for.
        </p>

        <Link
          to="/courses"
          className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* COURSE HERO */}
      <section className="bg-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/courses" className="text-indigo-200 hover:text-white">
            ← Back to Courses
          </Link>

          <p className="text-indigo-200 font-semibold mt-8">
            {course.category}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3 max-w-3xl">
            {course.title}
          </h1>

          <p className="text-indigo-100 text-lg mt-5 max-w-2xl">
            {course.description}
          </p>

          <div className="flex flex-wrap gap-6 mt-8 text-sm">
            <span>★ {course.rating} Rating</span>
            <span>{course.level}</span>
            <span>{course.duration}</span>
          </div>
        </div>
      </section>

      {/* COURSE INFORMATION */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-8">
            {/* WHAT YOU WILL LEARN */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">
                What You'll Learn
              </h2>

              <div className="grid sm:grid-cols-2 gap-5 mt-6">
                {[
                  "Understand the fundamentals",
                  "Develop practical skills",
                  "Work on real-world projects",
                  "Build confidence in your skills",
                  "Learn industry best practices",
                  "Apply your knowledge effectively",
                ].map((item) => (
                  <div key={item} className="flex gap-3 items-start">
                    <span className="text-green-600 font-bold">✓</span>
                    <p className="text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* COURSE DESCRIPTION */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">
                About This Course
              </h2>

              <p className="text-gray-600 leading-relaxed mt-5">
                {course.description}
              </p>

              <p className="text-gray-600 leading-relaxed mt-4">
                This course is designed to help learners develop valuable
                knowledge and practical skills at their own pace.
              </p>
            </div>

            {/* INSTRUCTOR */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">
                Your Instructor
              </h2>

              <div className="flex items-center gap-5 mt-6">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl">
                  👨‍🏫
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    {course.instructor}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    LearnHub Course Instructor
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ENROLLMENT CARD */}
          <aside>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 sticky top-6">
              <div className="h-40 bg-indigo-100 rounded-xl flex items-center justify-center">
                <span className="text-7xl">🎓</span>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-6">
                {course.price}
              </h2>

              <p className="text-gray-500 text-sm mt-1">One-time course fee</p>

              <div className="border-t border-gray-100 my-6" />

              <div className="space-y-4 text-gray-600">
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="font-semibold">{course.duration}</span>
                </div>

                <div className="flex justify-between">
                  <span>Skill Level</span>
                  <span className="font-semibold">{course.level}</span>
                </div>

                <div className="flex justify-between">
                  <span>Rating</span>
                  <span className="font-semibold">★ {course.rating}</span>
                </div>

                <div className="flex justify-between">
                  <span>Instructor</span>
                  <span className="font-semibold text-right">
                    {course.instructor}
                  </span>
                </div>
              </div>

              {isEnrolled ? (
                <Link
                  to="/my-learning"
                  className="block text-center w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Go to My Learning
                </Link>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                  {user ? "Enroll Now" : "Login to Enroll"}
                </button>
              )}

              <p className="text-center text-gray-400 text-xs mt-4">
                Start learning and develop your skills.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default CourseDetails;
