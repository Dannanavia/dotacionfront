'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const router = useRouter();
  const { setToken } = useAuth();

  const handleLogout = () => {
    setToken('');
    router.push('/');
  };

  return (
    <header className="bg-black text-[#FFD700] w-full shadow-md px-4 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
        {/* Logo */}
        <div className="flex justify-center sm:justify-start">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={60}
            height={60}
            className="object-contain"
          />
        </div>

        {/* Navegación */}
        <nav className="flex justify-center gap-6 text-sm md:text-base flex-wrap text-center">
          <a href="/home" className="hover:underline">Inicio</a>
          <a href="/municipality" className="hover:underline">Municipios</a>
          <a href="/inventory" className="hover:underline">Inventario</a>
        </nav>

        {/* Botón salir */}
        <div className="flex justify-center sm:justify-end">
          <button
            onClick={handleLogout}
            className="bg-[#FFD700] text-black px-4 py-1 rounded hover:bg-yellow-400 transition text-sm"
          >
            Salir
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
