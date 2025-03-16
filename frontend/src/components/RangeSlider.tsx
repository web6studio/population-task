import { FunctionComponent } from "react";
import { Range, getTrackBackground } from "react-range";

type Props = {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

// TODO: Redesign
const RangeSlider: FunctionComponent<Props> = ({ min, max, value, onChange }) => {
  return (
    <div className="w-full px-4 py-2">
      <label className="sr-only">Select year range</label>
      <div className="relative w-full h-10 flex items-center">
        <Range
          step={1}
          min={min}
          max={max}
          values={value}
          onChange={(vals) => onChange([vals[0], vals[1]])}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "4px",
                width: "100%",
                background: getTrackBackground({
                  values: value,
                  colors: ["#ddd", "#3b82f6", "#ddd"],
                  min,
                  max,
                }),
              }}
              className="relative rounded-full"
            >
              {children}
            </div>
          )}
          renderThumb={({ props, index }) => (
            <div
            {...props}
              key={index}
              
              style={{
                ...props.style,
                height: "20px",
                width: "20px",
                borderRadius: "50%",
                backgroundColor: "#3b82f6",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.3)",
              }}
              className="cursor-pointer"
            >
              <span className="absolute -top-7 bg-white border border-gray-200 text-xs text-gray-800 py-1 px-2 rounded-md shadow">
                {value[index]}
              </span>
            </div>
          )}
        />
      </div>
      <div className="flex justify-between text-sm text-gray-700 mt-2">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
