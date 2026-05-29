import type { ApplicationStatus } from "../../types";

type ApplicationFilter = "all" | ApplicationStatus;

type ApplicationFiltersProps = {
  activeFilter: ApplicationFilter;
  onFilterChange: (filter: ApplicationFilter) => void;
};

const filters: { label: string; value: ApplicationFilter }[] = [
  { label: "All Jobs", value: "all" },
  { label: "Shortlisted", value: "shortlisted" },
  { label: "Applied", value: "applied" },
  { label: "Rejected", value: "rejected" },
];

const ApplicationFilters = ({
  activeFilter,
  onFilterChange,
}: ApplicationFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex gap-3 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => onFilterChange(filter.value)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              activeFilter === filter.value
                ? "bg-slate-900 text-white"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ApplicationFilters;
export type { ApplicationFilter };
