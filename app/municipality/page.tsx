'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/header';
import SearchInput from '@/components/iconsearchinput';
import CustomSelect from '@/components/customSelect';
import InstitutionCard from '@/components/card';
import { fetchMunicipios, Municipio } from '@/services/municipios';
import { useAuth } from '@/context/AuthContext';

const tipos = [
  { value: '', label: 'Todos los tipos' },
  { value: 'publico', label: 'Público' },
  { value: 'privado', label: 'Privado' },
];

export default function MunicipiosPage() {
  const [busqueda, setBusqueda] = useState('');
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    const cargarMunicipios = async () => {
      try {
        const data = await fetchMunicipios(token);
        setMunicipios(data);
      } catch (err) {
        console.error('Error al cargar municipios:', err);
      }
    };

    cargarMunicipios();
  }, [token]);

  const municipiosFiltrados = municipios.filter((m) =>
    m.nombreMunicipio.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="bg-white min-h-screen">
      <Header />

      <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-8 mt-6 px-4 w-full">
        <SearchInput
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar municipio"
        />
        <CustomSelect
          options={tipos}
          value={tipoSeleccionado}
          onChange={(e) => setTipoSeleccionado(e.target.value)}
        />
      </div>

      <h2 className="text-center text-2xl font-semibold text-[#FFD700] mb-6 tracking-wide">
        Lista de Municipios
      </h2>

      <div className="flex flex-wrap gap-6 justify-center">
        {municipiosFiltrados.length > 0 ? (
          municipiosFiltrados.map((m) => (
            <Link key={m.idMunicipio} href={`/institution?municipio=${m.idMunicipio}`}>
              <InstitutionCard name={m.nombreMunicipio} />
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
