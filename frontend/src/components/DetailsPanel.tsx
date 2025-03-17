import { FunctionComponent } from "react";
import { formatNumber } from "../utils";

type Props = {
  selectedPoint: SelectedPoint | null;
  onClose: () => void;
};

const DetailsPanel: FunctionComponent<Props> = ({ selectedPoint, onClose }) => {
  return (
    <aside
      className={`h-screen bg-white hidden shadow-md border-l border-gray-200 transition-all duration-300 md:block ${
        selectedPoint ? "w-1/4 p-6" : "w-0 p-0 overflow-hidden"
      }`}
    >
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-lg font-semibold">Details</h2>
        <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>×</button>
      </div>
      <div className="pt-4">
        {selectedPoint ? (
          <>
            <p className="text-sm font-semibold">{selectedPoint.countryName} - {selectedPoint.year}</p>
            <p><strong>Population:</strong> {formatNumber(selectedPoint.population)}</p>
          </>
        ) : (
          <p className="text-gray-500">Click on a data point to see details.</p>
        )}
      </div>
    </aside>
  );
};

export default DetailsPanel;
