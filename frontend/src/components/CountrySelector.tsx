import { FunctionComponent, useState, useEffect } from "react";

type Props = {
  countries: string[];
  onChange: (selected: string[]) => void;
}

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
    <div className="p-4 border-r w-1/4 min-h-screen">
      <h2 className="font-bold mb-2">Select Countries</h2>
      <select
        multiple
        value={selected}
        onChange={handleSelect}
        className="w-full border p-2 rounded"
      >
        {sortedCountries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
