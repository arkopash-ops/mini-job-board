import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import type { LoginData } from "../../types";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const user = await login(formData);
      navigate(`/${user.role}/dashboard`, { replace: true });
    } catch (err) {
      setError(getApiErrorMessage(err, "Unable to sign in."));
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="user@mail.com"
          className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
          required
        />
      </div>

      <button
        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-semibold transition disabled:cursor-not-allowed disabled:bg-teal-300"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </button>

      <p className="text-center text-slate-500">
        Don't have an account?{" "}
        <Link to="/register" className="text-teal-600 font-semibold">
          Create Account
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
