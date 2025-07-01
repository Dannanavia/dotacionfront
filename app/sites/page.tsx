'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchSedesPorInstitucion, Sede } from '@/services/sedes';
import { Institucion } from '@/services/instituciones';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/header';
import Link from 'next/link';

function SitesPageContent() {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [institucion] = useState<Institucion | null>(null);
  const searchParams = useSearchParams();
  const institucionId = searchParams.get('institucion');
  const { token } = useAuth();

  useEffect(() => {
    if (!token || !institucionId) return;

    const cargar = async () => {
      try {
        const sedesData = await fetchSedesPorInstitucion(Number(institucionId), token);
        setSedes(sedesData);
      } catch (err) {
        console.error('Error al cargar sedes:', err);
      }
    };

    cargar();
  }, [token, institucionId]);

  return (
    <>
      {institucion && (
        <div className="my-8 px-4 text-center">
          <h2 className="text-3xl font-bold text-[#FFD700] mb-2">Institución</h2>
          <p className="text-lg text-gray-800">{institucion.nombreInstitucion}</p>
        </div>
      )}

      <h3 className="text-2xl font-semibold text-center text-gray-700 my-6">Sedes asociadas</h3>

      <div className="w-full overflow-x-auto px-4 pb-10">
        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-md border border-gray-200">
          <table className="min-w-[800px] w-full bg-white">
            <thead className="bg-gradient-to-r from-yellow-100 to-yellow-200 text-gray-800 text-sm uppercase tracking-wider text-center">
              <tr>
                <th className="py-3 px-4 border-b">Nombre</th>
                <th className="py-3 px-4 border-b">Dirección</th>
                <th className="py-3 px-4 border-b">Zona</th>
                <th className="py-3 px-4 border-b">Residencias Escolares</th>
                <th className="py-3 px-4 border-b">Dotaciones en Aulas</th>
                <th className="py-3 px-4 border-b">Acción</th>
              </tr>
            </thead>
            <tbody className="text-sm text-center text-gray-700">
              {sedes.length > 0 ? (
                sedes.map((sede) => (
                  <tr key={sede.idSede} className="hover:bg-yellow-50 border-t transition">
                    <td className="py-3 px-4 border-b">{sede.nombreSede}</td>
                    <td className="py-3 px-4 border-b">{sede.direccionSede}</td>
                    <td className="py-3 px-4 border-b">{sede.zonaSede}</td>
                    <td className="py-3 px-4 border-b">{sede.cantidadResidenciasEscolares}</td>
                    <td className="py-3 px-4 border-b">{sede.cantidadDotacionesAulas}</td>
                    <td className="py-3 px-4 border-b">
                      <Link href={`/dotacion?sede=${sede.idSede}`}>
                        <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-1 px-3 rounded shadow-sm text-xs transition">
                          Ver dotación
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500 py-6">
                    No hay sedes registradas para esta institución.
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

export default function SitesPage() {
  return (
    <main>
      <Header />
      <Suspense fallback={<div className="text-center py-10">Cargando sedes...</div>}>
        <SitesPageContent />
      </Suspense>
    </main>
  );
}
