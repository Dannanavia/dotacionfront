'use client';

import React from 'react';

interface InstitutionCardProps {
  name: string;
}

const InstitutionCard: React.FC<InstitutionCardProps> = ({ name }) => {
  return (
    <div
      className="relative w-64 h-36 rounded-xl overflow-hidden bg-gradient-to-br from-[#1f1f1f] to-[#2c2c2c] border border-[#FFD700]/50 
                 shadow-md hover:shadow-yellow-400/30 transform hover:scale-[1.03] transition-all duration-300 ease-in-out group"
    >
      {/* Borde animado */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400 rounded-xl transition-all duration-300 pointer-events-none"></div>

      {/* Contenido centrado */}
      <div className="flex items-center justify-center h-full p-4">
        <h3 className="text-center text-white text-lg font-semibold tracking-wide group-hover:text-yellow-400 transition-colors duration-300">
          {name}
        </h3>
      </div>
    </div>
  );
};

export default InstitutionCard;
