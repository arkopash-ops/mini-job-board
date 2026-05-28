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
      <div className="px-6 py-7 border-b border-outline-variant/40">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 overflow-hidden bg-neutral-secondary-medium rounded-full">
            <svg
              className="absolute w-12 h-12 text-body-subtle -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          <div>
            <h1 className="font-black text-2xl tracking-tight text-primary">
              HireStream
            </h1>

            <p className="text-sm text-on-surface-variant">
              Recruitment Platform
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="space-y-2">
          {visibleItems.map(({ label, description, to, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `group flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 hover:bg-teal-300 ${
                  isActive ? "bg-teal-600 text-white" : "hover:bg-teal-300"
                }`
              }
            >
              <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center group-hover:bg-secondary-container transition-all">
                <span className="material-symbols-outlined text-primary">
                  <Icon />
                </span>
              </div>

              <div>
                <p className="font-semibold text-sm text-primary">{label}</p>

                <p className="text-xs text-on-surface-variant">{description}</p>
              </div>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-outline-variant/40">
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
