export interface Institucion{
  idInstitucion: number;
  nombreInstitucion: string;
 
}

export const fetchInstituciones = async (token: string): Promise<Institucion[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}Institucion`, {
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  console.log(token);
  if (!res.ok) {
    throw new Error(`Error al obtener instituciones: ${res.status}`);
  }

  return res.json();
};
