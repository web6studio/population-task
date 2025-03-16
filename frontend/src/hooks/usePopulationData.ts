import { useQuery } from "@tanstack/react-query";
import { fetchPopulationData } from "../api/population";

export const usePopulationData = (countries?: string[], startYear?: number, endYear?: number) => {
  return useQuery({
    queryKey: ["population", countries, startYear, endYear],
    queryFn: () => fetchPopulationData(countries, startYear, endYear),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
