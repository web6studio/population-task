import { FunctionComponent, useState, useEffect, useMemo } from "react";
import { usePopulationData } from "../hooks/usePopulationData";
import CountrySelector from "../components/CountrySelector";
import PopulationChart from "../components/Chart";
import RangeSlider from "../components/RangeSlider";
import DetailsPanel from "../components/DetailsPanel";
import SkeletonLoader from "../components/SkeletonLoader";
import ErrorMessage from "../components/Error";

const Dashboard: FunctionComponent = () => {
  const { data, isLoading, error } = usePopulationData();
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["WLD"]);
  const [yearRange, setYearRange] = useState<[number, number] | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<SelectedPoint | null>(null);

  const minYear = useMemo(() => (data ? Math.min(...data.years) : 1960), [data]);
  const maxYear = useMemo(() => (data ? Math.max(...data.years) : 2023), [data]);

  // Set initial minYear and maxYear
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

  if (isLoading) return <SkeletonLoader />;
  if (error) return <ErrorMessage message="Failed to load population data. Please try again later." />;
  if (!data || !yearRange) return <ErrorMessage message="No data available." />;

  return (
    <div className="flex flex-col-reverse md:flex-row md:min-h-screen bg-white">
      {/* Sidebar */}
      <CountrySelector countries={data.countries} onChange={setSelectedCountries} />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-4xl font-bold mb-12 mt-8 m-4 uppercase">World population trends</h1>
        <PopulationChart data={filteredData} onPointClick={setSelectedPoint} />
        <RangeSlider min={minYear} max={maxYear} value={yearRange} onChange={setYearRange} />
      </main>

      {/* Details Panel */}
      <DetailsPanel selectedPoint={selectedPoint} onClose={() => setSelectedPoint(null)} />
    </div>
  );
};

export default Dashboard;
