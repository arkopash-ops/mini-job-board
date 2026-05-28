import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-xl border">
          {/* Left Side */}
          <div className="hidden lg:flex relative bg-slate-900 text-white p-14 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              alt="Office"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />

            <div className="relative z-10 mt-auto">
              <h2 className="text-5xl font-bold leading-tight mb-6">
                Build your future with top opportunities.
              </h2>

              <p className="text-slate-300 text-lg leading-relaxed">
                Join thousands of recruiters and job seekers using HireStream
                every day.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="p-8 lg:p-14 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-slate-900 mb-2">
                {title}
              </h2>

              <p className="text-slate-500">{subtitle}</p>
            </div>

            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthLayout;
