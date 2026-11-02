import { Link } from "react-router-dom";

function CourseCard({ id, title, category, level, duration, price, rating }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition">
      {/* Course Image Placeholder */}
      <div className="h-44 bg-indigo-100 flex items-center justify-center">
        <span className="text-5xl">📚</span>
      </div>

      {/* Course Information */}
      <div className="p-5">
        <p className="text-sm text-indigo-600 font-semibold">{category}</p>

        <h3 className="text-xl font-bold text-gray-900 mt-2">{title}</h3>

        <div className="flex justify-between text-sm text-gray-500 mt-4">
          <span>{level}</span>
          <span>{duration}</span>
        </div>

        <div className="flex justify-between items-center mt-5">
          <div>
            <p className="font-bold text-gray-900">{price}</p>
            <p className="text-sm text-yellow-600">★ {rating}</p>
          </div>

          <Link
            to={`/courses/${id}`}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
