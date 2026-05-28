import { Navigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import RegisterForm from "../../components/auth/RegisterForm";
import { useAuth } from "../../context/useAuth";

const Register = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start your journey with HireStream."
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
