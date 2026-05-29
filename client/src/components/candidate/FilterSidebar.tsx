import type { EmploymentType } from "../../types";

export type DateFilter = "Anytime" | "Last 24 hours" | "Last 7 days";

type FilterSidebarProps = {
  selectedTypes: EmploymentType[];
  dateFilter: DateFilter;
  onTypeChange: (type: EmploymentType) => void;
  onDateFilterChange: (dateFilter: DateFilter) => void;
  onClear: () => void;
};

const employmentTypes: EmploymentType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
];

const dateFilters: DateFilter[] = ["Anytime", "Last 24 hours", "Last 7 days"];

const FilterSidebar = ({
  selectedTypes,
  dateFilter,
  onTypeChange,
  onDateFilterChange,
  onClear,
}: FilterSidebarProps) => {
  return (
    <aside className="md:col-span-3 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold">Filters</h2>
        <button
          type="button"
          onClick={onClear}
          className="text-teal-600 text-sm"
        >
          Clear All
        </button>
      </div>

      <div>
        <label className="text-sm text-slate-600">Keywords</label>
      </div>

      {/* Job Type */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Job Type</h3>

        {employmentTypes.map((type) => (
          <label key={type} className="flex gap-2 items-center mb-1">
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() => onTypeChange(type)}
            />
            <span className="text-sm">{type}</span>
          </label>
        ))}
      </div>

      {/* Date */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Date Posted</h3>
        <select
          value={dateFilter}
          onChange={(event) =>
            onDateFilterChange(event.target.value as DateFilter)
          }
          className="w-full p-2 border rounded-lg"
        >
          {dateFilters.map((filter) => (
            <option key={filter}>{filter}</option>
          ))}
        </select>
      </div>
    </aside>
  );
};

export default FilterSidebar;
