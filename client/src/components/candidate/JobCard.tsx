import { useState } from "react";
import type { Job } from "../../types";
import { BiPlus, BiRupee } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";

type JobCardProps = {
  job: Job;
};

const formatDate = (date: string) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

const JobCard = ({ job }: JobCardProps) => {
  const [showModal, setShowModal] = useState(false);

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
          <button className="bg-teal-600 text-white px-4 py-1 rounded hover:bg-teal-700 transition">
            Quick Apply
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="text-gray-600 flex items-center gap-1 hover:text-teal-600 transition"
          >
            <BiPlus className="text-sm" />
            See Details
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-xl relative animate-fadeIn">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
            >
              <IoClose size={30} />
            </button>
            <h2 className="text-xl font-semibold mb-2">{job.title}</h2>

            <div className="mb-4">
              <p className="text-lg">
                <strong>Employment Type: </strong>
                {job.employmentType}
              </p>

              <p className="text-lg">
                <strong>Location: </strong>
                {job.location}
              </p>

              <p className="text-lg">
                <strong>Salary Range: </strong>
                {job.salaryRange}
              </p>
            </div>

            <div className="mb-4">
              <strong>Description: </strong>
              <p className="text-gray-700 text-sm mb-4">{job.description}</p>
            </div>

            <div className="text-sm text-gray-600 space-y-1 mb-5">
              <p>
                <strong>Posted:</strong> {formatDate(job.createdAt)}
              </p>
            </div>

            <button className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition">
              Quick Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
