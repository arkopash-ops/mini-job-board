import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import SearchJob from "./pages/candidate/SearchJob";
import JobApplications from "./pages/candidate/JobApplications";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import CreateJob from "./pages/recruiter/CreateJob";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useAuth } from "./context/useAuth";
import FindCandidates from "./pages/recruiter/FindCandidates";

const DashboardRedirect = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "candidate") {
    return <Navigate to="/candidate/find-jobs" replace />;
  }

  return <Navigate to="/recruiter/dashboard" replace />;
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
          element={<Navigate to="/candidate/find-jobs" replace />}
        />

        <Route
          path="/candidate/serachJob"
          element={<Navigate to="/candidate/find-jobs" replace />}
        />

        <Route
          path="/candidate/find-jobs"
          element={
            <ProtectedRoutes requiredRole="candidate">
              <SearchJob />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/candidate/applications"
          element={
            <ProtectedRoutes requiredRole="candidate">
              <JobApplications />
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

        <Route
          path="/recruiter/create-job"
          element={
            <ProtectedRoutes requiredRole="recruiter">
              <CreateJob />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/recruiter/find-candidates"
          element={
            <ProtectedRoutes requiredRole="recruiter">
              <FindCandidates />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
