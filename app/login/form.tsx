'use client';

import React, { useState } from 'react';
import { login } from '@/services/authDotacion';

const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await login({
        correoUsuario: email,
        contraseniaUsuario: password,
      });

      console.log('Login exitoso', response);
      // Redirigir o guardar token aquí
    } catch (err: any) {
      setError(err?.message || 'Error de autenticación');
    }
  };

  return (
    <div className="p-[2px] rounded-2xl bg-gradient-to-r from-[#C9A43F] to-[#FFD700] shadow-lg">
      <form
        onSubmit={handleSubmit}
        style={{ backgroundColor: '#2C2C2C' }}
        className="rounded-2xl overflow-hidden"
      >
        <div className="px-8 py-10">
          <h2 className="text-3xl font-bold text-center tracking-wider mb-6 text-[#FFD700]">
            SUMSERVICIOS
          </h2>

          {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

          {/* Email */}
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-[#FFD700]">
              Usuario
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 text-white bg-[#1A1A1A] border border-[#C9A43F] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-8">
            <label htmlFor="password" className="block text-sm font-medium mb-1 text-[#FFD700]">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 text-white bg-[#1A1A1A] border border-[#C9A43F] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="px-6 py-1.5 text-sm font-semibold rounded-md transition-colors duration-200 text-black mx-auto block"
            style={{ backgroundColor: '#C9A43F' }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#FFD700')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#C9A43F')}
          >
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
