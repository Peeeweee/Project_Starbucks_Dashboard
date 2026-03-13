import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Coffee } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f3ef] px-6">

      <div className="bg-[#fdfaf6] border border-[#efe8df] rounded-2xl shadow-lg p-10 max-w-md w-full text-center">

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="h-14 w-14 rounded-xl bg-[#006241]/10 flex items-center justify-center">
            <Coffee className="h-7 w-7 text-[#006241]" />
          </div>
        </div>

        {/* 404 Title */}
        <h1 className="text-5xl font-bold text-[#1E3932] mb-2">
          404
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-700 mb-2">
          Page not found
        </p>

        <p className="text-sm text-gray-500 mb-6">
          The page you are looking for doesn’t exist or may have been moved.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#006241] text-white text-sm font-medium shadow hover:bg-[#004f34] transition-all duration-200"
        >
          Return to Dashboard
        </Link>

      </div>

    </div>
  );
};

export default NotFound;