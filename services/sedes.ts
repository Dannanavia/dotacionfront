export interface Sede {
  idSede: number;
  nombreSede: string;
  direccionSede: string;
  zonaSede: string;
  codigodaneSede?: string;
  latitudSede?: string;
  longitudSede?: string;
  cantidadResidenciasEscolares: number;
  cantidadDotacionesAulas: number;
}


export const fetchSedesPorInstitucion = async (
  institucionId: number,
  token: string
): Promise<Sede[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}Sede/${institucionId}`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Error al obtener sedes: ${res.status}`);
  }

  return res.json();
};

export interface Dotacion {
  idArticulo: number;
  descripcionArticulo: string;
  tipoDotacion: string;
  cantidad: number;
}

export const fetchDotacionPorSede = async (sedeId: number, token: string): Promise<Dotacion[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}Sede/${sedeId}/dotacion`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Error al obtener dotación');
  return res.json();
};

