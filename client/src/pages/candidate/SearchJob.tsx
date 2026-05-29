import { useEffect, useMemo, useState } from "react";
import type { DateFilter } from "../../components/candidate/FilterSidebar";
import FilterSidebar from "../../components/candidate/FilterSidebar";
import JobCard from "../../components/candidate/JobCard";
import SearchBar from "../../components/candidate/SearchBar";
import Footer from "../../components/layout/Footer";
import Sidebar from "../../components/layout/Sidebar";
import { JobService } from "../../services/job.service";
import type { EmploymentType, Job } from "../../types";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

import loadingGif from "../../assets/loading.gif";
import errorImage from "../../assets/error.png";
import noJobsImage from "../../assets/no-job-found.png";

const isDateFilter = (createdAt: string, dateFilter: DateFilter) => {
  if (dateFilter === "Anytime") {
    return true;
  }

  const createdDate = new Date(createdAt);
  if (Number.isNaN(createdDate.getTime())) {
    return false;
  }

  const hours = dateFilter === "Last 24 hours" ? 24 : 24 * 7;
  const cutoff = Date.now() - hours * 60 * 60 * 1000;

  return createdDate.getTime() >= cutoff;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const SearchJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [searchedTitle, setSearchedTitle] = useState("");
  const [searchedLocation, setSearchedLocation] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<EmploymentType[]>([]);
  const [dateFilter, setDateFilter] = useState<DateFilter>("Anytime");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignoreResult = false;

    const fetchJobs = async () => {
      setIsLoading(true);
      setError("");

      const startTime = Date.now();

      try {
        const data = await JobService.getAllJobs(
          searchedTitle.trim(),
          searchedLocation.trim(),
        );

        const elapsed = Date.now() - startTime;
        const remainingDelay = Math.max(1500 - elapsed, 0);

        await delay(remainingDelay);

        if (!ignoreResult) {
          setJobs(data);
        }
      } catch (err) {
        const elapsed = Date.now() - startTime;
        const remainingDelay = Math.max(1500 - elapsed, 0);

        await delay(remainingDelay);

        if (!ignoreResult) {
          setError(getApiErrorMessage(err, "Unable to load jobs."));
        }
      } finally {
        if (!ignoreResult) {
          setIsLoading(false);
        }
      }
    };

    fetchJobs();

    return () => {
      ignoreResult = true;
    };
  }, [searchedTitle, searchedLocation]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesType =
        selectedTypes.length === 0 ||
        selectedTypes.includes(job.employmentType);
      const matchesDate = isDateFilter(job.createdAt, dateFilter);

      return matchesType && matchesDate;
    });
  }, [dateFilter, jobs, selectedTypes]);

  const handleSearch = () => {
    setSearchedTitle(title);
    setSearchedLocation(location);
  };

  const handleTypeChange = async (type: EmploymentType) => {
    setIsLoading(true);

    setSelectedTypes((currentTypes) =>
      currentTypes.includes(type)
        ? currentTypes.filter((currentType) => currentType !== type)
        : [...currentTypes, type],
    );

    await delay(1500);
    setIsLoading(false);
  };

  const clearFilters = async () => {
    setIsLoading(true);
    await delay(500);

    setSelectedTypes([]);
    setDateFilter("Anytime");

    setIsLoading(false);
  };

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 md:ml-72 flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto">
          {/* Sticky SearchBar */}
          <div className="sticky top-0 z-20 bg-slate-50 p-6 md:p-8 pb-4">
            <SearchBar
              title={title}
              location={location}
              onTitleChange={setTitle}
              onLocationChange={setLocation}
              onSearch={handleSearch}
            />
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 px-6 md:px-8">
            {/* Sticky Filter Sidebar */}
            <div className="md:col-span-3">
              <div className="sticky top-32">
                <FilterSidebar
                  selectedTypes={selectedTypes}
                  dateFilter={dateFilter}
                  onTypeChange={handleTypeChange}
                  onDateFilterChange={setDateFilter}
                  onClear={clearFilters}
                />
              </div>
            </div>

            {/* Jobs */}
            <div className="md:col-span-9 flex flex-col min-h-[70vh]">
              <div className="flex-1 space-y-4">
                {/* loading */}
                {isLoading && (
                  <div className="rounded-xl border border-slate-200 bg-white p-10 flex flex-col items-center justify-center text-center">
                    <img
                      src={loadingGif}
                      alt="Loading"
                      className="w-40 h-40 object-contain"
                    />

                    <p className="mt-4 text-slate-500">Loading jobs...</p>
                  </div>
                )}

                {/* error */}
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

                {/* job cards */}
                {!isLoading &&
                  !error &&
                  filteredJobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}

                {/* no job found */}
                {!isLoading && !error && filteredJobs.length === 0 && (
                  <div className="rounded-xl border border-slate-200 bg-white p-10 flex flex-col items-center justify-center text-center">
                    <img
                      src={noJobsImage}
                      alt="No jobs found"
                      className="w-64 h-auto mb-4"
                    />

                    <h3 className="text-xl font-semibold text-slate-700">
                      No jobs found
                    </h3>

                    <p className="text-slate-500 mt-2">
                      Try changing filters or search keywords.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchJob;
