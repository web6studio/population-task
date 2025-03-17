import { FunctionComponent, useState } from "react";
import { Search, X } from "lucide-react";

type Props = {
  countries: Country[];
  onChange: (selected: string[]) => void;
};

const CountrySelector: FunctionComponent<Props> = ({ countries, onChange }) => {
  const [selected, setSelected] = useState<string[]>(["WLD"]);
  const [searchTerm, setSearchTerm] = useState("");

  const sortedCountries = [{ code: "WLD", name: "World" }, ...countries.filter((c) => c.code !== "WLD")];

  const handleSelect = (countryCode: string) => {
    const newSelected = selected.includes(countryCode)
      ? selected.filter((c) => c !== countryCode)
      : [...selected, countryCode];
  
    setSelected(newSelected);
    onChange(newSelected);
  };
  
  const resetSelection = () => {
    setSelected(["WLD"]);
    onChange(["WLD"]);
  };

  const clearSearch = () => setSearchTerm("");

  const filteredCountries = sortedCountries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="h-screen shadow-md border-r border-gray-200 w-full md:w-1/4 flex flex-col">
      {/* Fixed Header */}
      <div className="p-6 border-b border-gray-300 bg-white sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          {/* Search Field */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded-sm focus:ring-1 focus:ring-blue-500 outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
            {searchTerm && (
              <button onClick={clearSearch} className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 cursor-pointer">
                <X size={18} />
              </button>
            )}
          </div>
          {/* Reset Button */}
          <button
            className="p-2 px-3 cursor-pointer bg-blue-500 text-white rounded-sm hover:bg-blue-600 transition"
            onClick={resetSelection}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Scrollable Country List */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4 select-none">
        {filteredCountries.map((country) => (
          <label
            key={country.code}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 p-2 rounded transition"
          >
            <input
              type="checkbox"
              checked={selected.includes(country.code)}
              onChange={() => handleSelect(country.code)}
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded"
            />
            <span className="text-md font-medium">{country.name}</span>
          </label>
        ))}
      </div>
    </aside>
  );
};

export default CountrySelector;
