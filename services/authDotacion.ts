import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface LoginPayload {
  correoUsuario: string;
  contraseniaUsuario: string;
}

interface LoginResponse {
  token: string;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    console.log('Intentando login con payload:', payload);
    const response = await api.post('/Auth/login', payload);
    return response.data; 
  } catch (error: any) {
    console.error('Error en login:', error.response?.data || error.message);
    throw error;
  }
};
