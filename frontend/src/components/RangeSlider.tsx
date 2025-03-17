import { FunctionComponent } from "react";
import { Range, getTrackBackground } from "react-range";

type Props = {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
};

const RangeSlider: FunctionComponent<Props> = ({ min, max, value, onChange }) => {
  return (
    <div className="flex items-center gap-8 w-full p-6 pt-1">
      {/* Left input */}
      <input
        type="number"
        disabled
        value={value[0]}
        onChange={(e) => onChange([Math.max(min, Number(e.target.value)), value[1]])}
        className="w-20 px-3 py-2 border bg-gray-100 border-gray-100 rounded-sm text-center text-sm outline-none
                   focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all
                   hide-arrows"
      />

      {/* Slider */}
      <div className="flex-1">
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
                height: "18px",
                width: "18px",
                borderRadius: "50%",
                backgroundColor: "#3b82f6",
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.3)",
              }}
              className="cursor-pointer"
            />
          )}
        />
      </div>

      {/* Right input */}
      <input
        type="number"
        value={value[1]}
        disabled
        onChange={(e) => onChange([value[0], Math.min(max, Number(e.target.value))])}
        className="w-20 px-3 py-2 border bg-gray-100 border-gray-100 rounded-sm text-center text-sm outline-none
                   focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all
                   hide-arrows"
      />
    </div>
  );
};

export default RangeSlider;
