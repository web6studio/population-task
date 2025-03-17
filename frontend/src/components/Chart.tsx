import { FunctionComponent } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";

import CustomTooltip from "./Tooltip";
import { transformPopulationData, formatNumber, generateColorByCode } from "../utils";

type Props = {
  data: Population;
  onPointClick: (point: SelectedPoint) => void;
};

const PopulationChart: FunctionComponent<Props> = ({ data, onPointClick }) => {
  const chartData = transformPopulationData(data);

  return (
    <ResponsiveContainer width="100%" height={530}>
      <LineChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
        onClick={(e) => {
          if (!e || !e.activePayload) return;
          
          const year = e.activePayload[0].payload.year;
          const payload = e.activePayload.map((point) => ({
            dataKey: point.dataKey,
            name: point.name,
            value: point.value,
            color: point.color,
          }));

          onPointClick({
            year,
            payload,
            data: chartData,
          });
        }}
      >
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
          tick={{ fontSize: 14, fill: "#2D2D2D", dy: 10 }}
          stroke="#2D2D2D"
          axisLine={{ stroke: "#2D2D2D", strokeWidth: 3 }} 
          tickLine={{ stroke: "#2D2D2D", strokeWidth: 3 }} 
        />

        <YAxis 
          tickFormatter={formatNumber} 
          tick={{ fontSize: 14, fill: "#2D2D2D", dx: -8 }} 
          stroke="#2D2D2D"
          axisLine={{ stroke: "#2D2D2D", strokeWidth: 3 }} 
          tickLine={{ stroke: "#2D2D2D", strokeWidth: 3 }} 
        />

        <Tooltip content={<CustomTooltip data={chartData} />} />

        <Legend wrapperStyle={{ fontSize: 16, paddingTop: 30 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PopulationChart;
