import { FunctionComponent } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";

import CustomTooltip from "./Tooltip";
import { transformPopulationData, formatNumber, generateColorByCode } from "../utils";

const PopulationChart: FunctionComponent<{ data: Population }> = ({ data }) => {
  const chartData = transformPopulationData(data);

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />

        {data.countries.map((country) => (
          <Line
            key={country.code}
            type="monotone"
            dataKey={country.code}
            name={country.name}
            stroke={generateColorByCode(country.code)}
            strokeWidth={3}
            dot={false}
          />
        ))}

        <XAxis 
          dataKey="year" 
          tick={{ fontSize: 14, fill: "#121212", dy: 10 }}
          stroke="#121212"
          axisLine={{ stroke: "#121212", strokeWidth: 3 }} 
          tickLine={{ stroke: "#121212", strokeWidth: 3 }} 
        />

        <YAxis 
          tickFormatter={formatNumber} 
          tick={{ fontSize: 14, fill: "#121212", dx: -8 }} 
          stroke="#121212"
          axisLine={{ stroke: "#121212", strokeWidth: 3 }} 
          tickLine={{ stroke: "#121212", strokeWidth: 3 }} 
        />

        <Tooltip content={<CustomTooltip data={chartData} />} />

        <Legend wrapperStyle={{ fontSize: 16, paddingTop: 30 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PopulationChart;
