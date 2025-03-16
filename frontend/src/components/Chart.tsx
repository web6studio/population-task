import { FunctionComponent } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { transformPopulationData, formatNumber, generateColorByCode } from "../utils";

// TODO: Redesign
const PopulationChart: FunctionComponent<{ data: Population }> = ({ data }) => {
  const chartData = transformPopulationData(data);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <XAxis dataKey="year" />
        <YAxis tickFormatter={(population: number) => formatNumber(population)} />
        <Tooltip formatter={(population: number) => formatNumber(population)} />
        <Legend />
        {data.countries.map((country) => (
          <Line
            key={country.code}
            dataKey={country.code}
            name={country.name}
            stroke={generateColorByCode(country.code)}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PopulationChart;
