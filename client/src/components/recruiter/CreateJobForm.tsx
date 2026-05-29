import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { RiBold, RiItalic, RiLink, RiListUnordered } from "react-icons/ri";
import { JobService } from "../../services/job.service";
import type { CreateJobData, EmploymentType } from "../../types";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

const employmentTypes: EmploymentType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
];

const initialForm = {
  title: "",
  location: "",
  minSalary: "",
  maxSalary: "",
  employmentType: "Full-time" as EmploymentType,
  description: "",
};

const CreateJobForm = () => {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const updateField = <Key extends keyof typeof form>(
    key: Key,
    value: (typeof form)[Key],
  ) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    const trimmedTitle = form.title.trim();
    const trimmedLocation = form.location.trim();
    const trimmedDescription = form.description.trim();
    const trimmedMinSalary = form.minSalary.trim();
    const trimmedMaxSalary = form.maxSalary.trim();

    if (
      !trimmedTitle ||
      !trimmedLocation ||
      !trimmedMinSalary ||
      !trimmedMaxSalary ||
      !trimmedDescription
    ) {
      setError("Please fill in all job details before posting.");
      return;
    }

    const data: CreateJobData = {
      title: trimmedTitle,
      location: trimmedLocation,
      employmentType: form.employmentType,
      salaryRange: `${trimmedMinSalary} - ${trimmedMaxSalary}`,
      description: trimmedDescription,
    };

    try {
      setIsSubmitting(true);
      await JobService.createJob(data);
      setForm(initialForm);
      setSuccessMessage("Job posted successfully.");
    } catch (err) {
      setError(getApiErrorMessage(err, "Unable to create job."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setForm(initialForm);
    setError("");
    setSuccessMessage("");
  };

  return (
    <div className="max-w-4xl w-full mx-auto mt-10 space-y-10">
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Basic Info */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Title */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-800">
                Job Title
              </label>

              <input
                type="text"
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                placeholder="e.g. Senior Product Designer"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition-all"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-800">
                Location
              </label>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                  <CiLocationOn />
                </span>

                <input
                  type="text"
                  value={form.location}
                  onChange={(event) =>
                    updateField("location", event.target.value)
                  }
                  placeholder="City, State or Remote"
                  className="w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 py-3 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Salary + Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Salary */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-800">
                Salary Range (Annual)
              </label>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                    <FaIndianRupeeSign />
                  </span>

                  <input
                    type="number"
                    value={form.minSalary}
                    onChange={(event) =>
                      updateField("minSalary", event.target.value)
                    }
                    placeholder="Min"
                    className="w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 py-3 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition-all"
                  />
                </div>

                <span className="text-slate-400">-</span>

                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                    <FaIndianRupeeSign />
                  </span>

                  <input
                    type="number"
                    value={form.maxSalary}
                    onChange={(event) =>
                      updateField("maxSalary", event.target.value)
                    }
                    placeholder="Max"
                    className="w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 py-3 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Employment Type */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-800">
                Employment Type
              </label>

              <select
                value={form.employmentType}
                onChange={(event) =>
                  updateField("employmentType", event.target.value as EmploymentType)
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition-all"
              >
                {employmentTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <section className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Job Description</h2>

          <p className="text-slate-600">
            Describe the responsibilities, requirements, and culture candidates
            can expect.
          </p>
        </section>

        {/* Description Box */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          {/* Toolbar */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <button
              type="button"
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <span className="text-slate-600">
                <RiBold className="text-gray-500 hover:text-teal-600 text-lg" />
              </span>
            </button>

            <button
              type="button"
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <span className="text-slate-600">
                <RiItalic className="text-gray-500 hover:text-teal-600 text-lg" />
              </span>
            </button>

            <button
              type="button"
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <span className="text-slate-600">
                <RiListUnordered className="text-gray-500 hover:text-teal-600 text-lg" />
              </span>
            </button>

            <button
              type="button"
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <span className="text-slate-600">
                <RiLink className="text-gray-500 hover:text-teal-600 text-lg" />
              </span>
            </button>
          </div>

          {/* Textarea */}
          <textarea
            rows={10}
            value={form.description}
            onChange={(event) =>
              updateField("description", event.target.value)
            }
            placeholder="Write the role details here..."
            className="w-full text-lg resize-none rounded-xl border border-slate-300 bg-white px-4 py-4 text-slate-900 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition-all"
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-700">
            {successMessage}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-slate-200 pt-6">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-teal-700 text-white text-sm font-semibold hover:bg-teal-800 transition-all shadow-lg shadow-teal-100 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              {isSubmitting ? "Posting..." : "Post Job"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateJobForm;
