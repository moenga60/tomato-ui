import { Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Camera className="h-8 w-8 text-red-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              TomatoGrade AI
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("login")}
              className="text-gray-600 hover:text-gray-900"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("register")}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
