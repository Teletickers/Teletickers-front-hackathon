import { useQuery } from '@apollo/client/react';
import { GET_EVENTOS_PUBLICADOS } from '../../lib/graphql/queries';
import EventCard from './EventCard';
import type { Evento } from '../../types';

interface EventosData {
  eventosPublicados: Evento[];
}

export default function EventList() {
  const { data, loading, error } = useQuery<EventosData>(GET_EVENTOS_PUBLICADOS);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-4">Cargando eventos...</p>
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

  const eventos = data?.eventosPublicados || []; // Cambia esto

  if (eventos.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600 text-lg">No hay eventos disponibles</p>
        <p className="text-gray-500 text-sm mt-2">Vuelve pronto para ver nuevos eventos</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {eventos.map((evento) => (
        <EventCard key={evento.id} evento={evento} />
      ))}
    </div>
  );
}