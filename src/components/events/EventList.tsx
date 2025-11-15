import { useQuery } from "@apollo/client/react";
import { GET_EVENTOS_PUBLICADOS } from '../../lib/graphql/queries';
import EventCard from './EventCard';
import type { Evento } from '../../types';

export default function EventList() {
  const { data, loading, error } = useQuery(GET_EVENTOS_PUBLICADOS);

  if (loading) return <div className="text-center py-8">Cargando eventos...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error.message}</div>;

  const eventos: Evento[] = data?.eventos_publicados || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {eventos.map((evento) => (
        <EventCard key={evento.id} evento={evento} />
      ))}
    </div>
  );
}