'use client';
import React from 'react';
import Form from '@/app/login/form';

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#0D0D0D' }}
    >
      <div className="w-full max-w-md">
        <Form />
      </div>
    </div>
  );
}
