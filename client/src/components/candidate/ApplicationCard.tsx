import type { ApplicationStatus } from "../../types";

type ApplicationCardProps = {
  title: string;
  location: string;
  appliedDate: string;
  status: ApplicationStatus;
  salaryRange?: string;
  employmentType?: string;
  onViewJob: () => void;
};

const statusStyles = {
  shortlisted: "bg-emerald-100 text-emerald-700",
  applied: "bg-slate-200 text-slate-700",
  rejected: "bg-red-100 text-red-600",
};

const ApplicationCard = ({
  title,
  location,
  appliedDate,
  status,
  salaryRange,
  employmentType,
  onViewJob,
}: ApplicationCardProps) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-all flex flex-col lg:flex-row items-center gap-5">
      <div className="w-12 h-12 rounded-lg bg-teal-50 text-teal-700 flex shrink-0 items-center justify-center font-semibold">
        {title.charAt(0).toUpperCase()}
      </div>

      <div className="flex-1 text-center lg:text-left">
        <h3
          className={`text-lg font-bold ${
            status === "rejected" ? "text-slate-400" : "text-slate-900"
          }`}
        >
          {title}
        </h3>

        <p
          className={`text-sm mt-1 ${
            status === "rejected" ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {[employmentType, location, salaryRange].filter(Boolean).join(" - ")}
        </p>
      </div>

      <div
        className={`hidden lg:block text-right px-6 ${
          status === "rejected" ? "opacity-50" : ""
        }`}
      >
        <span className="block text-xs text-slate-400 mb-1">Applied on</span>

        <span className="text-sm font-medium text-slate-700">
          {appliedDate}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize ${statusStyles[status]}`}
        >
          {status}
        </span>

        <button
          type="button"
          onClick={onViewJob}
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm font-semibold hover:bg-slate-100 transition-colors"
        >
          View Job
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;
