import { FunctionComponent, useState, useEffect } from "react";

type Props = {
  countries: string[];
  onChange: (selected: string[]) => void;
};

// TODO: Redesign
const CountrySelector: FunctionComponent<Props> = ({ countries, onChange }) => {
  const [selected, setSelected] = useState<string[]>(["WLD"]);

  // Ensure "WLD" is always first in the list
  const sortedCountries = ["WLD", ...countries.filter((country) => country !== "WLD")];

  useEffect(() => {
    onChange(selected);
  }, [selected, onChange]);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelected(value);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-primary mb-4">Select Countries</h2>
      <div className="relative">
        <select
          multiple
          value={selected}
          onChange={handleSelect}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {sortedCountries.map((country) => (
            <option key={country} value={country} className="p-2">
              {country}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CountrySelector;
