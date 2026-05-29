import type { ApplicationStatus, Job } from "../../types";

import { BiRupee } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { formatDate } from "../../utils/formatDate";

type JobCardProps = {
  job: Job;
  onSelect: (job: Job) => void;
  applicationStatus?: ApplicationStatus;
};

const statusLabel = {
  applied: "Applied",
  shortlisted: "Shortlisted",
  rejected: "Rejected",
};

const JobCard = ({ job, onSelect, applicationStatus }: JobCardProps) => {
  return (
    <div className="bg-white border rounded-xl p-4 flex gap-4 hover:shadow-md transition">
      <div className="w-12 h-12 rounded-lg bg-teal-50 text-teal-700 flex shrink-0 items-center justify-center font-semibold">
        {job.title.charAt(0).toUpperCase()}
      </div>

      <div className="flex-1">
        <div className="flex justify-between gap-4">
          <h3 className="font-semibold text-lg">{job.title}</h3>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded h-fit">
            {formatDate(job.createdAt)}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 text-sm text-gray-500">
          <span className="px-2 py-1 rounded-full transition hover:bg-teal-50 hover:text-teal-700 cursor-default">
            {job.employmentType}
          </span>

          <span className="px-2 py-1 rounded-full flex items-center gap-1 transition hover:bg-teal-50 hover:text-teal-700 cursor-default">
            <CiLocationOn />
            {job.location}
          </span>

          <span className="px-2 py-1 rounded-full flex items-center gap-1 transition hover:bg-teal-50 hover:text-teal-700 cursor-default">
            <BiRupee />
            {job.salaryRange}
          </span>
        </div>

        <p className="text-sm mt-2 text-gray-600 line-clamp-2">
          {job.description}
        </p>

        <div className="flex gap-4 mt-4">
          <button
            className={`px-4 py-1 rounded transition ${
              applicationStatus
                ? "bg-slate-200 text-slate-700"
                : "bg-teal-600 text-white hover:bg-teal-700"
            }`}
            onClick={() => onSelect(job)}
          >
            {applicationStatus ? statusLabel[applicationStatus] : "Quick Apply"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
