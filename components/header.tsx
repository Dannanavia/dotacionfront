'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const router = useRouter();
  const { setToken } = useAuth();

  const handleLogout = () => {
    setToken(''); 
    router.push('/login'); 
  };

  return (
    <header className="bg-black text-[#FFD700] px-4 py-6 shadow-md w-full">
      <div className="flex items-center justify-between w-full">
     
        <div className="flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={70}
            height={70}
          />
        </div>

        
        <nav className="flex-1 flex justify-center gap-8 text-sm md:text-base">
          <a href="/home" className="hover:underline">Inicio</a>
          <a href="/municipality" className="hover:underline">Municipios</a>
          <a href="/inventory" className="hover:underline">Inventario</a>
        </nav>

       
        <div className="flex-shrink-0">
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
