'use client';
import React from 'react';

const InstitutionCard = ({ name }: { name: string }) => (
  <div
    className="w-[200px] h-[120px] bg-[#323232] rounded-xl flex items-center justify-center text-[#FFD700] font-bold shadow-md hover:-translate-y-1 transition-transform cursor-pointer"
  >
    {name}
  </div>
);

export default InstitutionCard;
