'use client';
import React from 'react';

type Option = {
  value: string;
  label: string;
};

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CustomSelect = ({ options, value, onChange }: CustomSelectProps) => (
  <select
    value={value}
    onChange={onChange}
    className="bg-[#1a1a1a] text-white border-none py-2 px-5 rounded-full text-sm shadow-inner shadow-black/40 focus:outline-none"
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export default CustomSelect;
