'use client';

import React from 'react';

const Header = () => {
  return (
    <header className="bg-black text-[#FFD700] px-4 shadow-md w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        {/* Logo y navegación */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="font-bold text-lg">LOGO</div>
          <nav className="flex gap-4 text-sm md:text-base">
            <a href="#" className="hover:underline">Inicio</a>
            <a href="#" className="hover:underline">Institución</a>
            <a href="#" className="hover:underline">Inventario</a>
          </nav>
        </div>

        {/* Botón salir */}
        <div className="flex justify-end sm:justify-start">
          <button className="bg-[#FFD700] text-black px-4 py-1 rounded hover:bg-yellow-400 transition text-sm">
            Salir
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
