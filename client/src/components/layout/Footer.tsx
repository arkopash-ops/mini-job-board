import { FaGlobe, FaShareAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Logo + Description */}
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">HireStream</h2>

          <p className="text-slate-500 max-w-sm">
            Connecting talent with opportunity since 2026.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <a href="#" className="text-slate-500 hover:text-teal-600 transition">
            Privacy Policy
          </a>

          <a href="#" className="text-slate-500 hover:text-teal-600 transition">
            Terms of Service
          </a>

          <a href="#" className="text-slate-500 hover:text-teal-600 transition">
            Cookie Policy
          </a>

          <a href="#" className="text-slate-500 hover:text-teal-600 transition">
            Contact Us
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4 text-slate-500">
          <button className="hover:text-teal-600 transition">
            <FaGlobe size={18} />
          </button>

          <button className="hover:text-teal-600 transition">
            <FaShareAlt size={18} />
          </button>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t py-5 text-center">
        <p className="text-sm text-slate-500">
          © 2024 HireStream Recruitment Technologies. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
