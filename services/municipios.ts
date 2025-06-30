// services/municipios.ts
import { Institucion } from './instituciones';
export interface Municipio {
  idMunicipio: number;
  nombreMunicipio: string;
  institucion: Institucion[]; 
}

export const fetchMunicipios = async (token: string): Promise<Municipio[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}Municipio`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Error al obtener municipios');
  return res.json();
};
