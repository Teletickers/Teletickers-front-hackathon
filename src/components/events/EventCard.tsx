import type { Evento } from '../../types';

interface Props {
  evento: Evento;
}

export default function EventCard({ evento }: Props) {
  return (
    <a
      href={`/eventos/${evento.id}`}
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-transparent dark:border-gray-700"
    >
      {evento.miniatura && (
        <img
          src={evento.miniatura || "/placeholder.svg"}
          alt={evento.titulo}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{evento.titulo}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">{evento.descripcion}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span>📅 {new Date(evento.fecha).toLocaleDateString()}</span>
          <span>🕐 {evento.hora}</span>
        </div>
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          📍 {evento.distrito}, {evento.provincia}
        </div>
        <div className="mt-3 flex justify-between items-center">
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
            {evento.categoria}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">Aforo: {evento.aforo}</span>
        </div>
      </div>
    </a>
  );
}
