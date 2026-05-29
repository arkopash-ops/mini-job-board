import {
  BiLogOut,
  BiSolidFolder,
  BiSearchAlt,
  BiBarChartSquare,
  BiBriefcase,
} from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import type { IconType } from "react-icons";
import type { UserRole } from "../../types";
import { useState } from "react";
import LogoutModal from "./LogoutModal";

type MenuItem = {
  role: UserRole;
  label: string;
  description: string;
  to: string;
  Icon: IconType;
};

const menuItems: MenuItem[] = [
  {
    role: "recruiter",
    label: "Dashboard",
    description: "Overview & analytics",
    to: "/recruiter/dashboard",
    Icon: BiBarChartSquare,
  },
  {
    role: "recruiter",
    label: "Create Job",
    description: "Create new Job",
    to: "/recruiter/create-job",
    Icon: BiBriefcase,
  },
  {
    role: "recruiter",
    label: "Candidates for Jobs",
    description: "Find candidates",
    to: "/recruiter/find-candidates",
    Icon: BiBriefcase,
  },
  {
    role: "candidate",
    label: "Find Jobs",
    description: "Browse opportunities",
    to: "/candidate/find-jobs",
    Icon: BiSearchAlt,
  },
  {
    role: "candidate",
    label: "Applications",
    description: "Track your status",
    to: "/candidate/applications",
    Icon: BiSolidFolder,
  },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const visibleItems = menuItems.filter((item) => item.role === user?.role);

  const confirmLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <aside className="hidden md:flex flex-col h-screen w-72 fixed left-0 top-0 z-50 bg-white/75 backdrop-blur-2xl border-r border-white/20 shadow-[0_8px_32px_rgba(15,23,42,0.08)]">
      {/* <!-- Logo --> */}
      <div className="px-6 py-7 border-b border-slate-200/40">
        <div className="flex items-center gap-3">

          <div>
            <h1 className="font-black text-2xl text-teal-600 tracking-tight">
              HireStream
            </h1>

            <p className="text-sm text-slate-600">Recruitment Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="space-y-2">
          {visibleItems.map(({ label, description, to, Icon }) => (
            <NavLink key={to} to={to}>
              {({ isActive }) => (
                <div
                  className={`group flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
                    isActive ? "bg-teal-600 text-white" : "hover:bg-teal-300"
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                      isActive
                        ? "bg-white/20"
                        : "bg-slate-100 group-hover:bg-teal-100"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined ${
                        isActive ? "text-white" : "text-teal-600"
                      }`}
                    >
                      <Icon />
                    </span>
                  </div>

                  <div>
                    <p
                      className={`font-semibold text-sm ${
                        isActive ? "text-white" : "text-teal-600"
                      }`}
                    >
                      {label}
                    </p>

                    <p
                      className={`text-xs ${
                        isActive ? "text-white/80" : "text-slate-600"
                      }`}
                    >
                      {description}
                    </p>
                  </div>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-200/40">
        <button
          type="button"
          onClick={() => setShowLogoutModal(true)}
          className="group flex w-full items-center gap-4 px-4 py-3 rounded-2xl hover:bg-red-50 transition-all duration-300 text-left"
        >
          <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
            <span className="material-symbols-outlined text-red-500">
              <BiLogOut />
            </span>
          </div>

          <div>
            <p className="font-semibold text-sm text-red-500">Logout</p>

            <p className="text-xs text-red-400">Secure sign out</p>
          </div>
        </button>
      </div>

      {showLogoutModal && (
        <LogoutModal onCancel={cancelLogout} onConfirm={confirmLogout} />
      )}
    </aside>
  );
};

export default Sidebar;
