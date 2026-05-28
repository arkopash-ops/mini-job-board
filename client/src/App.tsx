import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useAuth } from "./context/useAuth";

const DashboardRedirect = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={`/${user.role}/dashboard`} replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<DashboardRedirect />} />

        <Route
          path="/candidate/dashboard"
          element={
            <ProtectedRoutes requiredRole="candidate">
              <CandidateDashboard />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/recruiter/dashboard"
          element={
            <ProtectedRoutes requiredRole="recruiter">
              <RecruiterDashboard />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
