import { BiMap, BiSearchAlt } from "react-icons/bi";

type SearchBarProps = {
  title: string;
  location: string;
  onTitleChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSearch: () => void;
};

const SearchBar = ({
  title,
  location,
  onTitleChange,
  onLocationChange,
  onSearch,
}: SearchBarProps) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSearch();
      }}
      className="bg-white border border-slate-200 rounded-xl flex flex-col md:flex-row overflow-hidden mb-6"
    >
      <div className="flex items-center flex-1 px-4 border-r border-slate-200">
        <BiSearchAlt className="text-slate-500 mr-2 shrink-0" />
        <input
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Job title or keyword"
          className="w-full py-4 bg-transparent outline-none text-base"
        />
      </div>

      <div className="flex items-center flex-1 px-4 border-r border-slate-200">
        <BiMap className="text-slate-500 mr-2 shrink-0" />
        <input
          value={location}
          onChange={(event) => onLocationChange(event.target.value)}
          placeholder="Location"
          className="w-full py-4 bg-transparent outline-none text-base"
        />
      </div>

      <button
        type="submit"
        className="bg-teal-600 text-white px-8 py-4 text-base font-semibold"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
