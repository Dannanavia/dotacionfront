'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import SearchInput from '@/components/iconsearchinput';
import CustomSelect from '@/components/customSelect';
import InstitutionCard from '@/components/card';
import { fetchInstitucionesPorMunicipio, Institucion } from '@/services/instituciones';
import { useAuth } from '@/context/AuthContext';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const tipos = [
  { value: '', label: 'Todos los tipos' },
  { value: 'publico', label: 'Público' },
  { value: 'privado', label: 'Privado' },
];

export default function InstitucionesPage() {
  const [busqueda, setBusqueda] = useState('');
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const [instituciones, setInstituciones] = useState<Institucion[]>([]);
  const { token } = useAuth();
  const searchParams = useSearchParams();
  const municipioId = searchParams.get('municipio');

  useEffect(() => {
    if (!token || !municipioId) return;

    const cargar = async () => {
      try {
        const data = await fetchInstitucionesPorMunicipio(Number(municipioId), token);
        setInstituciones(data);
      } catch (err) {
        console.error('Error al cargar instituciones:', err);
      }
    };

    cargar();
  }, [token, municipioId]);

  const institucionesFiltradas = instituciones.filter((inst) =>
    inst.nombreInstitucion.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="bg-white min-h-screen">
      {/* Header */}
      <Header />

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

      {/* Título */}
      <h2 className="text-center text-2xl font-semibold text-[#FFD700] mb-6 tracking-wide">
        Lista de Instituciones
      </h2>

      {/* Cards */}
      <div className="flex flex-wrap gap-6 justify-center">
        {institucionesFiltradas.length > 0 ? (
          institucionesFiltradas.map((inst) => (
            <Link key={inst.idInstitucion} href={`/sites?institucion=${inst.idInstitucion}`}>
              <InstitutionCard
                key={inst.idInstitucion}
                name={inst.nombreInstitucion}
              />
            </Link>

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
