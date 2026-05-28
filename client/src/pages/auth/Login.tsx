import { Navigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";
import { useAuth } from "../../context/useAuth";

const Login = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue your journey."
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
