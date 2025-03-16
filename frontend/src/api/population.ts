import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"; // Fallback

export const fetchPopulationData = async (countries: string[] = [], startYear?: number, endYear?: number): Promise<Population> => {
  const params = new URLSearchParams();
  if (countries.length) params.append("countries", countries.join(","));
  if (startYear) params.append("start_year", startYear.toString());
  if (endYear) params.append("end_year", endYear.toString());

  const response = await axios.get(`${API_BASE_URL}/population?${params.toString()}`);
  return response.data;
};
