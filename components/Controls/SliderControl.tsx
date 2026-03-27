'use client';

import { useCallback, useRef } from 'react';

interface SliderControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
}

export default function SliderControl({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: SliderControlProps) {
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseFloat(e.target.value);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        onChange(val);
      }, 16);
    },
    [onChange]
  );

  const displayValue = step >= 1 ? value.toFixed(0) : value.toFixed(2);

  return (
    <div className="group">
      <div className="flex justify-between mb-1.5">
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          {label}
        </label>
        <span className="text-xs font-mono text-gray-500 group-hover:text-purple-400 transition-colors">
          {displayValue}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full h-1.5 bg-gray-700/50 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-purple-500
          [&::-webkit-slider-thumb]:hover:bg-purple-400
          [&::-webkit-slider-thumb]:transition-colors
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(168,85,247,0.4)]
          hover:bg-gray-600/50 transition-colors"
      />
    </div>
  );
}
