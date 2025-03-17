import { FunctionComponent } from "react";
import { TooltipProps } from "recharts";
import { formatNumber } from "../utils";

interface CustomTooltipProps extends TooltipProps<number, string> {
  data: TransformedPopulationData[];
}

const Tooltip: FunctionComponent<CustomTooltipProps> = ({ active, payload, data }) => {
  if (!active || !payload || payload.length === 0 || !data) return null;

  const year = payload[0].payload.year;
  // Used to calc growth
  const firstYearData = data.find((entry) => entry.year === data[0].year);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg border border-gray-300">
      <p className="text-sm font-semibold">{`Year: ${year}`}</p>
      {payload.map((entry) => {
        const countryCode = entry.dataKey as string;
        const population = entry.value as number;
        const firstYearPopulation = firstYearData ? firstYearData[countryCode] : 0;
        const growth = population - firstYearPopulation;
        const growthPercent = firstYearPopulation ? ((growth / firstYearPopulation) * 100).toFixed(2) : "N/A";

        return (
          <div key={entry.name} className="flex items-center gap-2 pt-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <p className="text-sm">
              <strong>{entry.name}:</strong> {formatNumber(population)}
              {growth !== 0 && (
                <>
                  {" "}
                  (<span className={growth > 0 ? "text-green-500" : "text-red-500"}>
                    {growth > 0 ? "+" : ""}
                    {formatNumber(growth)} / {growth > 0 ? "+" : ""}{growthPercent}%
                  </span>)
                </>
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Tooltip;
