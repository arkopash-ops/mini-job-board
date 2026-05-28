import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleProtectedAction = () => {
    setShowPopup(true);
  };

  return (
    <>
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-teal-600 px-8 py-14 lg:px-14">
            {/* Decorative Circle */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left Content */}
              <div className="max-w-2xl text-center lg:text-left">
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-5">
                  Hire your dream team faster.
                </h2>

                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                  Post your job today and reach millions of qualified candidates
                  searching for their next career move.
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <button
                    onClick={handleProtectedAction}
                    className="bg-slate-900 hover:bg-slate-800 transition px-6 py-3 rounded-xl font-semibold shadow-lg"
                  >
                    Post a Job for Free
                  </button>

                  <button
                    onClick={handleProtectedAction}
                    className="border border-white/40 hover:bg-white/10 transition px-6 py-3 rounded-xl font-semibold"
                  >
                    Recruiter Solutions
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="hidden lg:block relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                  alt="Recruiter Workspace"
                  className="w-72 h-72 object-cover rounded-2xl shadow-2xl rotate-3"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Login Required
            </h3>

            <p className="text-slate-600 mb-6">
              You need to login first to continue.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="px-5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CTASection;
