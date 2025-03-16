import { FunctionComponent, useState, useEffect, useMemo } from "react";
import { usePopulationData } from "../hooks/usePopulationData";
import CountrySelector from "../components/CountrySelector";
import PopulationChart from "../components/Chart";
import RangeSlider from "../components/RangeSlider";

// TODO: Redesign
const Dashboard: FunctionComponent = () => {
  const { data, isLoading, error } = usePopulationData();
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["WLD"]);
  const [yearRange, setYearRange] = useState<[number, number] | null>(null);
  
  const minYear = useMemo(() => (data ? Math.min(...data.years) : 1960), [data]);
  const maxYear = useMemo(() => (data ? Math.max(...data.years) : 2023), [data]);

  useEffect(() => {
    if (data) {
      setYearRange([minYear, maxYear]);
    }
  }, [data, minYear, maxYear]);

  const filteredData = useMemo(() => {
    if (!data || !yearRange) return { years: [], countries: [] };

    return {
      years: data.years.filter((year) => year >= yearRange[0] && year <= yearRange[1]),
      countries: data.countries
        .filter((country) => selectedCountries.includes(country.code))
        .map((country) => ({
          ...country,
          data: country.data.slice(
            data.years.indexOf(yearRange[0]),
            data.years.indexOf(yearRange[1]) + 1
          ),
        })),
    };
  }, [data, selectedCountries, yearRange]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;
  if (!data || !yearRange) return <p>No data available.</p>;

  return (
    <div className="flex">
      <CountrySelector countries={data.countries.map((c) => c.code)} onChange={setSelectedCountries} />
      <div className="flex-1 p-4">
        <PopulationChart data={filteredData} />
        <RangeSlider min={minYear} max={maxYear} value={yearRange} onChange={setYearRange} />
      </div>
    </div>
  );
};

export default Dashboard;
