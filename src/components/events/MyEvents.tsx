import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import EventCard from './EventCard';
import type { Evento } from '../../types';

const GET_MIS_EVENTOS = gql`
  query MisEventos {
    misEventos {
      id
      titulo
      descripcion
      fecha
      hora
      region
      provincia
      distrito
      categoria
      aforo
      estado
    }
  }
`;

interface MisEventosData {
  misEventos: Evento[];
}

export default function MyEvents() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  const { data, loading, error } = useQuery<MisEventosData>(GET_MIS_EVENTOS, {
    skip: !isLoggedIn,
  });

  if (!isLoggedIn) return null;

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-4 text-gray-600">Cargando tus eventos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-8 bg-red-50 rounded-lg p-4">
        <p className="font-semibold">Error al cargar eventos</p>
        <p className="text-sm mt-2">{error.message}</p>
      </div>
    );
  }

  const eventos = data?.misEventos || [];
  const eventosBorrador = eventos.filter((e) => e.estado === 'borrador');
  const eventosPublicados = eventos.filter((e) => e.estado === 'publicado');
  const eventosCancelados = eventos.filter((e) => e.estado === 'cancelado');
  const eventosFinalizados = eventos.filter((e) => e.estado === 'finalizado');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Mis Eventos</h1>
          <p className="text-gray-600">Gestiona todos tus eventos creados</p>
        </div>

        <a
          href="/crear-evento"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Crear Nuevo Evento
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-blue-700">{eventosPublicados.length}</h2>
          <p className="text-gray-600">Publicados</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-yellow-700">{eventosBorrador.length}</h2>
          <p className="text-gray-600">Borradores</p>
        </div>
        <div className="bg-red-50 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-red-700">{eventosCancelados.length}</h2>
          <p className="text-gray-600">Cancelados</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-green-700">{eventosFinalizados.length}</h2>
          <p className="text-gray-600">Finalizados</p>
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventos.map((evento) => (
          <EventCard key={evento.id} evento={evento} />
        ))}
      </div>
    </div>
  );
}
