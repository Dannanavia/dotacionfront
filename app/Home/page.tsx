'use client';

import React, { useState } from 'react';
import Header from '@/components/header';
import SearchInput from '@/components/iconsearchinput';
import CustomSelect from '@/components/customSelect';
import InstitutionCard from '@/components/institutionCard';

const mockInstitutions = [
  { id: 1, nombre: 'Colegio Central' },
  { id: 2, nombre: 'Instituto Norte' },
  { id: 3, nombre: 'Escuela Sur' },
  { id: 4, nombre: 'Academia Premium' },
];

const tipos = [
  { value: '', label: 'Todos los tipos' },
  { value: 'publico', label: 'Público' },
  { value: 'privado', label: 'Privado' },
];

export default function InstitucionesPage() {
  const [busqueda, setBusqueda] = useState('');
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');

  const institucionesFiltradas = mockInstitutions.filter((inst) =>
    inst.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="bg-white min-h-screen ">
      {/* Header */}
      <Header />

      {/* Título */}
      <h2 className="text-center text-4xl font-semibold text-[#FFD700] mt-10 mb-1.5 tracking-wide ">
        Articulos de dotacion de la instituciones
      </h2>
      {/* Filtros centrados */}
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
            <InstitutionCard key={inst.id} name={inst.nombre} />
          ))
        ) : (
          <p className="text-white text-center w-full">
            No se encontraron resultados.
          </p>
        )}
      </div>
    </main>
  );
}
