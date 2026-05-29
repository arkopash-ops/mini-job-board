import { useEffect, useMemo, useState } from "react";
import ApplicationCard from "../../components/candidate/ApplicationCard";
import ApplicationFilters from "../../components/candidate/ApplicationFilters";
import type { ApplicationFilter } from "../../components/candidate/ApplicationFilters";
import SearchBar from "../../components/candidate/SearchBar";
import Footer from "../../components/layout/Footer";
import Sidebar from "../../components/layout/Sidebar";
import { ApplicationService } from "../../services/application.service";
import type { Application, Job } from "../../types";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";
import { formatDate } from "../../utils/formatDate";

import loadingGif from "../../assets/loading.gif";
import errorImage from "../../assets/error.png";
import noJobsImage from "../../assets/no-job-found.png";
import selectImage from "../../assets/select.png";

const getApplicationJob = (application: Application) => {
  return typeof application.jobId === "string" ? null : application.jobId;
};

const getJobTitle = (job: Job | null) => {
  return job?.title ?? "Job unavailable";
};

const statusStyles = {
  shortlisted: "bg-emerald-100 text-emerald-700",
  applied: "bg-slate-200 text-slate-700",
  rejected: "bg-red-100 text-red-600",
};

const JobApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [searchedTitle, setSearchedTitle] = useState("");
  const [searchedLocation, setSearchedLocation] = useState("");
  const [activeFilter, setActiveFilter] = useState<ApplicationFilter>("all");
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  useEffect(() => {
    let ignoreResult = false;

    const fetchApplications = async () => {
      setIsLoading(true);
      setError("");

      try {
        const data = await ApplicationService.getMyApplications();

        if (!ignoreResult) {
          setApplications(data);
        }
      } catch (err) {
        if (!ignoreResult) {
          setError(getApiErrorMessage(err, "Unable to load applications."));
        }
      } finally {
        if (!ignoreResult) {
          setIsLoading(false);
        }
      }
    };

    fetchApplications();

    return () => {
      ignoreResult = true;
    };
  }, []);

  const filteredApplications = useMemo(() => {
    const normalizedTitle = searchedTitle.trim().toLowerCase();
    const normalizedLocation = searchedLocation.trim().toLowerCase();

    return applications.filter((application) => {
      const job = getApplicationJob(application);
      const titleText = getJobTitle(job).toLowerCase();
      const locationText = job?.location.toLowerCase() ?? "";

      const matchesStatus =
        activeFilter === "all" || application.status === activeFilter;
      const matchesTitle =
        !normalizedTitle || titleText.includes(normalizedTitle);
      const matchesLocation =
        !normalizedLocation || locationText.includes(normalizedLocation);

      return matchesStatus && matchesTitle && matchesLocation;
    });
  }, [activeFilter, applications, searchedLocation, searchedTitle]);

  const handleSearch = () => {
    setSearchedTitle(title);
    setSearchedLocation(location);
  };

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 md:ml-72 flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto">
          <div className="sticky top-0 z-20 bg-slate-50 p-6 md:p-8 pb-4">
            <SearchBar
              title={title}
              location={location}
              onTitleChange={setTitle}
              onLocationChange={setLocation}
              onSearch={handleSearch}
            />
          </div>

          <div className="px-6 md:px-8">
            <div className="mt-10 min-h-[70vh]">
              <ApplicationFilters
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                <div className="xl:col-span-7 space-y-4">
                  {isLoading && (
                    <div className="rounded-xl border border-slate-200 bg-white p-10 flex flex-col items-center justify-center text-center">
                      <img
                        src={loadingGif}
                        alt="Loading"
                        className="w-40 h-40 object-contain"
                      />

                      <p className="mt-4 text-slate-500">
                        Loading applications...
                      </p>
                    </div>
                  )}

                  {!isLoading && error && (
                    <div className="rounded-xl border border-red-200 bg-white p-10 flex flex-col items-center justify-center text-center">
                      <img
                        src={errorImage}
                        alt="Error"
                        className="w-64 h-auto mb-4"
                      />

                      <h3 className="text-xl font-semibold text-red-600">
                        Something went wrong
                      </h3>

                      <p className="text-slate-500 mt-2">{error}</p>
                    </div>
                  )}

                  {!isLoading &&
                    !error &&
                    filteredApplications.map((application) => {
                      const job = getApplicationJob(application);

                      return (
                        <ApplicationCard
                          key={application._id}
                          title={getJobTitle(job)}
                          location={job?.location ?? "Location unavailable"}
                          salaryRange={job?.salaryRange}
                          employmentType={job?.employmentType}
                          appliedDate={formatDate(application.createdAt)}
                          status={application.status}
                          onViewJob={() => setSelectedApplication(application)}
                        />
                      );
                    })}

                  {!isLoading &&
                    !error &&
                    filteredApplications.length === 0 && (
                      <div className="rounded-xl border border-slate-200 bg-white p-10 flex flex-col items-center justify-center text-center">
                        <img
                          src={noJobsImage}
                          alt="No applications found"
                          className="w-64 h-auto mb-4"
                        />

                        <h3 className="text-xl font-semibold text-slate-700">
                          No applications found
                        </h3>

                        <p className="text-slate-500 mt-2">
                          Apply for jobs to track your application status here.
                        </p>
                      </div>
                    )}
                </div>

                <div className="xl:col-span-5">
                  <div className="sticky top-32">
                    {selectedApplication ? (
                      (() => {
                        const job = getApplicationJob(selectedApplication);

                        return (
                          <div className="bg-white border rounded-xl p-6 shadow-sm">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                                  Application Details
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                  {getJobTitle(job)}
                                </h2>
                              </div>

                              <span
                                className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize ${statusStyles[selectedApplication.status]}`}
                              >
                                {selectedApplication.status}
                              </span>
                            </div>

                            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-slate-400">Location</p>
                                <p className="font-medium text-slate-700">
                                  {job?.location ?? "Unavailable"}
                                </p>
                              </div>

                              <div>
                                <p className="text-slate-400">Employment</p>
                                <p className="font-medium text-slate-700">
                                  {job?.employmentType ?? "Unavailable"}
                                </p>
                              </div>

                              <div>
                                <p className="text-slate-400">Salary</p>
                                <p className="font-medium text-slate-700">
                                  {job?.salaryRange ?? "Unavailable"}
                                </p>
                              </div>

                              <div>
                                <p className="text-slate-400">Applied On</p>
                                <p className="font-medium text-slate-700">
                                  {formatDate(selectedApplication.createdAt)}
                                </p>
                              </div>
                            </div>

                            <div className="mt-6">
                              <h3 className="text-sm font-semibold text-slate-800">
                                Job Description
                              </h3>

                              <p className="mt-2 text-sm leading-6 text-slate-600">
                                {job?.description ??
                                  "Full job description is not available for this application."}
                              </p>
                            </div>

                            <div className="mt-6">
                              <h3 className="text-sm font-semibold text-slate-800">
                                Your Cover Letter
                              </h3>

                              <p className="mt-2 whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                                {selectedApplication.coverLetter}
                              </p>
                            </div>
                          </div>
                        );
                      })()
                    ) : (
                      <div className="bg-white border rounded-xl p-10 text-center text-slate-500">
                        <img src={selectImage} alt="Select Job" />
                        Select an application to view job and application
                        details
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplications;
