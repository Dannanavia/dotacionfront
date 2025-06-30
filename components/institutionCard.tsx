'use client';

import React from 'react';

interface InstitutionCardProps {
  name: string;
}

const InstitutionCard: React.FC<InstitutionCardProps> = ({ name }) => {
  return (
    <div
      className="cursor-pointer bg-[#2C2C2C] hover:bg-[#3a3a3a] text-white rounded-xl shadow-md p-6 w-64 transition duration-200 ease-in-out border border-[#FFD700]"
    >
      <h3 className="text-lg font-semibold text-center text-[#FFD700]">
        {name}
      </h3>
    </div>
  );
};

export default InstitutionCard;
