import { BiBuildingHouse, BiUser } from "react-icons/bi";
import type { UserRole } from "../../types";

interface RoleSelectorProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
}

const RoleSelector = ({ value, onChange }: RoleSelectorProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        onClick={() => onChange("candidate")}
        className={`rounded-2xl border p-4 transition ${
          value === "candidate"
            ? "border-teal-600 bg-teal-50"
            : "border-slate-200 bg-white hover:border-teal-300"
        }`}
      >
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-3">
            <BiUser />
          </div>

          <h3 className="font-semibold text-slate-900">Job Seeker</h3>

          <p className="text-sm text-slate-500 mt-1">Find your dream career</p>
        </div>
      </button>

      <button
        type="button"
        onClick={() => onChange("recruiter")}
        className={`rounded-2xl border p-4 transition ${
          value === "recruiter"
            ? "border-teal-600 bg-teal-50"
            : "border-slate-200 bg-white hover:border-teal-300"
        }`}
      >
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-3">
            <BiBuildingHouse />
          </div>

          <h3 className="font-semibold text-slate-900">Recruiter</h3>

          <p className="text-sm text-slate-500 mt-1">Hire top talent</p>
        </div>
      </button>
    </div>
  );
};

export default RoleSelector;
