'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import SearchInput from '@/components/iconsearchinput';
import CustomSelect from '@/components/customSelect';
import InstitutionCard from '@/components/institutionCard';
import { fetchInstituciones } from '@/services/instituciones';
import { useAuth } from '@/context/AuthContext'; // solo si usas contexto

type Institucion = {
  idInstitucion: number;
  nombreInstitucion: string;
  // Agrega más campos si necesitas
};

const tipos = [
  { value: '', label: 'Todos los tipos' },
  { value: 'publico', label: 'Público' },
  { value: 'privado', label: 'Privado' },
];

export default function InstitucionesPage() {
  const [busqueda, setBusqueda] = useState('');
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const [instituciones, setInstituciones] = useState<Institucion[]>([]);

  // Si usas contexto:
  const { token } = useAuth();

  // Si NO usas contexto, usa localStorage directo:
  // const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        if (!token) return;
        const data = await fetchInstituciones(token);
        setInstituciones(data);
      } catch (err) {
        console.error('Error al cargar instituciones:', err);
      }
    };

    cargarDatos();
  }, [token]);

  const institucionesFiltradas = instituciones.filter((inst) =>
    inst.nombreInstitucion.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="bg-white min-h-screen">
      {/* Header */}
      <Header />

      {/* Título */}
      <h2 className="text-center text-4xl font-semibold text-[#FFD700] mt-10 mb-1.5 tracking-wide">
        Artículos de dotación de las instituciones
      </h2>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-8 mt-6 px-4 w-full">
        <SearchInput
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar institución"
        />
        <CustomSelect
          options={tipos}
          value={tipoSeleccionado}
          onChange={(e) => setTipoSeleccionado(e.target.value)}
        />
      </div>

      {/* Cards */}
      <div className="flex flex-wrap gap-6 justify-center">
        {institucionesFiltradas.length > 0 ? (
          institucionesFiltradas.map((inst) => (
            <InstitutionCard
              key={inst.idInstitucion}
              name={inst.nombreInstitucion}
            />
          ))
        ) : (
          <p className="text-black text-center w-full">
            No se encontraron resultados.
          </p>
        )}
      </div>
    </main>
  );
}
