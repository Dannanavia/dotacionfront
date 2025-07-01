'use client';

import React, { useState } from 'react';
import { login } from '@/services/authDotacion';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Form = () => {
  const router = useRouter();
  const { setToken } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await login({
        correoUsuario: email,
        contraseniaUsuario: password,
      });

      setToken(response.token);

      console.log('Login exitoso', response);
      router.push('/municipality');
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error en login:', err.message);
      }
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
            <Image
              src="/images/logo.png"
              alt="Logo Sumservicios"
              width={100}
              height={100}
              className="mx-auto mb-4"
            />
            SUMSERVICIOS DNJ
          </h2>

          {error && (
            <p className="text-red-400 text-sm text-center mb-4">{error}</p>
          )}

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

          <div className="mb-8">
            <label htmlFor="password" className="block text-sm font-medium mb-1 text-[#FFD700]">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 pr-10 text-white bg-[#1A1A1A] border border-[#C9A43F] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#FFD700] focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-.708.071-1.398.204-2.067M3.172 3.172L20.828 20.828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 5C7.455 5 3.732 8.162 2 12c1.732 3.838 5.455 7 10 7s8.268-3.162 10-7c-1.732-3.838-5.455-7-10-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-1.5 text-sm font-semibold rounded-md transition-colors duration-200 text-black mx-auto block"
            style={{ backgroundColor: '#C9A43F' }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = '#FFD700')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = '#C9A43F')
            }
          >
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
