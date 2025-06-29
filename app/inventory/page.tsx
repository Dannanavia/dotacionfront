'use client';

import React from 'react';
import Header from '@/components/header';

const InventoryPage = () => {
  const steps = [
    { label: 'En bodega', status: 'completed' },
    { label: 'En camino', status: 'current' },
    { label: 'Entregado', status: 'pending' },
  ];

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-white text-black">
        {/* Timeline vertical a la izquierda */}
        <aside className="w-1/4 bg-gray-100 p-8">
          <h2 className="text-lg font-semibold mb-6 text-[#C9A43F]">Seguimiento</h2>
          <ol className="relative border-l border-[#FFD700]">
            {steps.map((step, index) => (
              <li className="mb-10 ml-4" key={index}>
                <div className={`absolute w-3 h-3 rounded-full -left-1.5 top-1 ${
                  step.status === 'completed'
                    ? 'bg-[#FFD700]'
                    : step.status === 'current'
                    ? 'bg-yellow-400 animate-pulse'
                    : 'bg-gray-400'
                }`}></div>
                <h3
                  className={`font-semibold text-sm ${
                    step.status === 'current' ? 'text-[#FFD700]' : ''
                  }`}
                >
                  {step.label}
                </h3>
              </li>
            ))}
          </ol>
        </aside>

        {/* Contenido del inventario */}
        <section className="flex-1 p-10">
          <h1 className="text-2xl font-bold mb-6 text-[#FFD700]">
            Artículos en dotación
          </h1>
          {/* Puedes renderizar aquí los detalles del inventario */}
          <div className="bg-gray-200 rounded p-4 shadow">
            <p>Aquí podrías listar los productos, fechas de envío, cantidad, etc.</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default InventoryPage;
