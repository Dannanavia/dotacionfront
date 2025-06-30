'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import SearchInput from '@/components/iconsearchinput';
import CustomSelect from '@/components/customSelect';
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
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState<Municipio | null>(null);
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

  const volver = () => setMunicipioSeleccionado(null);

  return (
    <main className="bg-white min-h-screen">
      <Header />

      {municipioSeleccionado ? (
        <>
          <button
            onClick={volver}
            className="ml-6 mt-6 text-sm text-blue-600 underline"
          >
            ← Volver a municipios
          </button>

          <h2 className="text-center text-2xl font-bold text-[#FFD700] mt-6 mb-4">
            Sedes en {municipioSeleccionado.nombreMunicipio}
          </h2>

          {/* Tabla de instituciones */}
          <div className="overflow-x-auto px-6">
            <table className="min-w-full bg-white border border-gray-300 shadow">
              <thead className="bg-[#FFD700] text-black">
                <tr>
                  <th className="px-4 py-2 text-left border">Nombre Institución</th>
                  <th className="px-4 py-2 text-left border">Código</th>
                  <th className="px-4 py-2 text-left border">Calendario</th>
                </tr>
              </thead>
              <tbody>
                {municipioSeleccionado.institucion.length > 0 ? (
                  municipioSeleccionado.institucion.map((inst) => (
                    <tr key={inst.idInstitucion} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border">{inst.nombreInstitucion}</td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-4 text-gray-500">
                      No hay instituciones registradas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          {/* Filtros */}
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

          {/* Grilla de municipios */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
            {municipiosFiltrados.length > 0 ? (
              municipiosFiltrados.map((m) => (
                <div
                  key={m.idMunicipio}
                  onClick={() => setMunicipioSeleccionado(m)}
                  className="bg-gray-100 p-4 rounded shadow hover:shadow-md cursor-pointer"
                >
                  <h3 className="text-lg font-semibold text-black">
                    {m.nombreMunicipio}
                  </h3>
                </div>
              ))
            ) : (
              <p className="text-black text-center col-span-full">
                No se encontraron municipios.
              </p>
            )}
          </div>
        </>
      )}
    </main>
  );
}
