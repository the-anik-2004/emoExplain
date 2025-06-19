import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center  text-amber-300 backdrop-blur">
      <h1 className="text-9xl font-bold text-amber-500">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-gray-200  font-semibold mt-2">
        The page you are looking for doesn’t seem to exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 rounded-full bg-amber-400 text-gray-900 font-bold hover:bg-amber-500 transition cursor-pointer"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
