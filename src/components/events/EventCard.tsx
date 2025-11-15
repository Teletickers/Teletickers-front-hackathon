// src/components/events/EventCard.tsx
import type { Evento } from '../../types';

interface Props {
  evento: Evento;
}

export default function EventCard({ evento }: Props) {
  return (
    <a
      href={`/eventos/${evento.id}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
    >
      {evento.miniatura && (
        <img
          src={evento.miniatura}
          alt={evento.titulo}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{evento.titulo}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{evento.descripcion}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>📅 {new Date(evento.fecha).toLocaleDateString()}</span>
          <span>🕐 {evento.hora}</span>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          📍 {evento.distrito}, {evento.provincia}
        </div>
        <div className="mt-3 flex justify-between items-center">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
            {evento.categoria}
          </span>
          <span className="text-sm text-gray-600">Aforo: {evento.aforo}</span>
        </div>
      </div>
    </a>
  );
}
