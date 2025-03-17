import { FunctionComponent } from "react";
import { formatNumber } from "../utils";

type Props = {
  selectedPoint: SelectedPoint | null;
  onClose: () => void;
};

const DetailsPanel: FunctionComponent<Props> = ({ selectedPoint, onClose }) => {
  if (!selectedPoint || selectedPoint.payload.length === 0) return null;

  const year = selectedPoint.year;
  const firstYearData = selectedPoint.data.find((entry) => entry.year === selectedPoint.data[0].year);

  return (
    <aside
      className={`min-h-screen bg-white hidden shadow-md border-l border-gray-200 md:block ${
        selectedPoint ? "w-1/4 p-6" : "w-0 p-0 overflow-hidden"
      }`}
    >
      <div className="flex justify-between items-center border-b border-gray-500 pb-5 mb-4">
        <h2 className="text-2xl uppercase font-bold">{`Year: ${year}`}</h2>
        <button className="cursor-pointer hover:text-gray-700 text-4xl" onClick={onClose}>
          &times;
        </button>
      </div>

      <div className="space-y-4">
        {selectedPoint.payload.map((entry) => {
          const countryCode = entry.dataKey;
          const population = entry.value;
          const firstYearPopulation = firstYearData ? firstYearData[countryCode] : 0;
          const growth = population - firstYearPopulation;
          const growthPercent = firstYearPopulation ? ((growth / firstYearPopulation) * 100).toFixed(2) : "N/A";

          return (
            <div key={entry.name} className="border-b border-gray-300 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
                <p className="text-lg font-medium">{entry.name}</p>
              </div>

              <p className="py-1">
                <strong>Population:</strong> {formatNumber(population)}
              </p>

              {growth !== 0 && (
                <p>
                  <strong>Growth:</strong>{" "}
                  <span className={growth > 0 ? "text-green-500" : "text-red-500"}>
                    {growth > 0 ? "+" : ""}
                    {formatNumber(growth)} / {growth > 0 ? "+" : ""}{growthPercent}%
                  </span>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default DetailsPanel;
