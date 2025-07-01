'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchDotacionPorSede, Dotacion } from '@/services/sedes';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/header';

function DotacionTable() {
  const [dotacion, setDotacion] = useState<Dotacion[]>([]);
  const searchParams = useSearchParams();
  const sedeId = searchParams.get('sede');
  const { token } = useAuth();

  useEffect(() => {
    if (!token || !sedeId) return;

    const cargarDotacion = async () => {
      try {
        const data = await fetchDotacionPorSede(Number(sedeId), token);
        setDotacion(data);
      } catch (err) {
        console.error('Error al cargar dotación:', err);
      }
    };

    cargarDotacion();
  }, [token, sedeId]);

  return (
    <>
      <h2 className="text-center text-3xl font-bold text-[#FFD700] my-8">
        Dotación de la sede
      </h2>

      <div className="overflow-x-auto px-4 pb-10">
        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-md">
          <table className="min-w-full bg-white">
            <thead className="bg-gradient-to-r from-yellow-100 to-yellow-200 text-gray-800 text-sm uppercase tracking-wider">
              <tr>
                <th className="text-center px-6 py-4 border-b border-gray-200">Artículo</th>
                <th className="text-center px-6 py-4 border-b border-gray-200">Tipo de dotación</th>
                <th className="text-center px-6 py-4 border-b border-gray-200">Cantidad</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {dotacion.length > 0 ? (
                dotacion.map((art) => (
                  <tr
                    key={art.idArticulo}
                    className="hover:bg-yellow-50 transition duration-200 text-center"
                  >
                    <td className="px-6 py-4 border-b border-gray-200">{art.descripcionArticulo}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{art.tipoDotacion}</td>
                    <td className="px-6 py-4 border-b border-gray-200 font-semibold text-gray-900">
                      {art.cantidad}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-6 text-center text-gray-500">
                    No hay dotación registrada para esta sede.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default function DotacionPage() {
  return (
    <main>
      <Header />
      <Suspense fallback={<div className="text-center py-10 text-gray-500">Cargando dotación...</div>}>
        <DotacionTable />
      </Suspense>
    </main>
  );
}
