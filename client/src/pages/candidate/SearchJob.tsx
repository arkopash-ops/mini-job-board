import Sidebar from "../../components/layout/Sidebar";
import Footer from "../../components/layout/Footer";
import { useAuth } from "../../context/useAuth";

const SearchJob = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Sidebar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 md:pl-80">
        <p className="text-sm font-semibold text-teal-700">Candidate</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Welcome{user?.name ? `, ${user.name}` : ""}
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Track your applications and discover jobs that match your next move.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default SearchJob;
