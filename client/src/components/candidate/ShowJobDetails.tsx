import { useState } from "react";
import { BiRupee } from "react-icons/bi";
import { RiBold, RiItalic, RiLink, RiListUnordered } from "react-icons/ri";
import type { Job } from "../../types";
import { formatDate } from "../../utils/formatDate";

type Props = {
  job: Job;
  isApplied: boolean;
  isApplying: boolean;
  applyMessage: string;
  applyError: string;
  onApply: (coverLetter: string) => Promise<void>;
};

const ShowJobDetails = ({
  job,
  isApplied,
  isApplying,
  applyMessage,
  applyError,
  onApply,
}: Props) => {
  const [coverLetter, setCoverLetter] = useState("");

  const handleApply = async () => {
    await onApply(coverLetter);
  };

  return (
    <div className="bg-white rounded-xl p-6 border shadow-sm">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-xl relative animate-fadeIn border">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          {job.title}
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          {job.employmentType} - {job.location}
        </p>

        {/* Info */}
        <div className="mb-4 space-y-2">
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <strong>Salary Range:</strong>
            <BiRupee className="text-gray-500" />
            {job.salaryRange}
          </p>
        </div>

        {/* Description */}
        <div className="mb-4">
          <strong className="text-gray-700">Description:</strong>
          <p className="text-sm text-gray-600 mt-1 leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Posted */}
        <div className="text-xs text-gray-500 mb-5">
          Posted: {formatDate(job.createdAt)}
        </div>

        {/* Cover Letter */}
        <section className="space-y-1 mb-3">
          <h3 className="text-sm font-semibold text-gray-700">Cover Letter</h3>
          <p className="text-xs text-gray-500">
            Describe yourself as a culture fit candidate
          </p>
        </section>

        {/* Editor */}
        <div className="bg-white border rounded-xl p-4 space-y-3 mb-5">
          <div className="flex gap-2 border-b pb-2 mb-2">
            <button
              type="button"
              className="p-1.5 hover:bg-gray-100 rounded transition"
            >
              <RiBold className="text-gray-500 hover:text-teal-600 text-lg" />
            </button>

            <button
              type="button"
              className="p-1.5 hover:bg-gray-100 rounded transition"
            >
              <RiItalic className="text-gray-500 hover:text-teal-600 text-lg" />
            </button>

            <button
              type="button"
              className="p-1.5 hover:bg-gray-100 rounded transition"
            >
              <RiListUnordered className="text-gray-500 hover:text-teal-600 text-lg" />
            </button>

            <button
              type="button"
              className="p-1.5 hover:bg-gray-100 rounded transition"
            >
              <RiLink className="text-gray-500 hover:text-teal-600 text-lg" />
            </button>
          </div>

          <textarea
            value={coverLetter}
            onChange={(event) => setCoverLetter(event.target.value)}
            disabled={isApplied || isApplying}
            className="w-full h-28 resize-none border-none focus:outline-none text-sm text-gray-700 placeholder-gray-400 disabled:bg-white"
            placeholder="Write about yourself in detail here..."
          />
        </div>

        {applyError && (
          <p className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {applyError}
          </p>
        )}

        {applyMessage && (
          <p className="mb-3 rounded-lg border border-teal-200 bg-teal-50 px-3 py-2 text-sm text-teal-700">
            {applyMessage}
          </p>
        )}

        {/* Apply */}
        <button
          type="button"
          onClick={handleApply}
          disabled={isApplied || isApplying}
          className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isApplying ? "Applying..." : isApplied ? "Already Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
};

export default ShowJobDetails;
