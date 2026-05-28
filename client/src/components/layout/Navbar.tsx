import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          className="text-2xl font-bold text-slate-900"
          onClick={() => navigate("/")}
        >
          HireStream
        </a>

        <div className="flex items-center gap-4">
          <button
            className="font-semibold text-slate-800"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>

          <button
            className="bg-teal-600 text-white px-5 py-2 rounded-lg"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
