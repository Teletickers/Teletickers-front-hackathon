import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { SEARCH_EVENTOS, GET_EVENTOS_PUBLICADOS } from '../../lib/graphql/queries';
import EventCard from '../events/EventCard';
import type { Evento } from '../../types';

interface EventosData {
  searchEventos?: Evento[];
  eventosPublicados?: Evento[];
}

export default function SearchResults() {
  const [searchParams, setSearchParams] = useState({
    q: '',
    ciudad: '',
    precio: '',
    categoria: '',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchParams({
      q: params.get('q') || '',
      ciudad: params.get('ciudad') || '',
      precio: params.get('precio') || '',
      categoria: params.get('categoria') || '',
    });
  }, []);

  const { data, loading, error } = useQuery<EventosData>(
    searchParams.q ? SEARCH_EVENTOS : GET_EVENTOS_PUBLICADOS,
    {
      variables: searchParams.q ? { query: searchParams.q } : undefined,
    }
  );

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
        <p className="mt-4 text-gray-600">Buscando eventos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-8 bg-red-50 rounded-lg p-4">
        <p className="font-semibold">Error al buscar eventos</p>
        <p className="text-sm mt-2">{error.message}</p>
      </div>
    );
  }

  let eventos = data?.searchEventos || data?.eventosPublicados || [];

  // Filtrar por ciudad
  if (searchParams.ciudad && searchParams.ciudad !== 'Todas') {
    eventos = eventos.filter(
      (e) =>
        e.region === searchParams.ciudad ||
        e.provincia === searchParams.ciudad ||
        e.distrito === searchParams.ciudad
    );
  }

  // Filtrar por categoría
  if (searchParams.categoria && searchParams.categoria !== 'Todos') {
    eventos = eventos.filter(
      (e) => e.categoria.toLowerCase() === searchParams.categoria.toLowerCase()
    );
  }

  // Filtrar por precio (simulado - en producción vendría de la API)
  if (searchParams.precio && searchParams.precio !== 'all') {
    const precioNum = parseInt(searchParams.precio);
    if (searchParams.precio === '0') {
      // Solo gratis
      eventos = eventos.filter(() => Math.random() > 0.7); // Simulado
    } else if (searchParams.precio === '100+') {
      eventos = eventos.filter(() => Math.random() > 0.5); // Simulado
    } else {
      eventos = eventos.filter(() => Math.random() > 0.3); // Simulado
    }
  }

  const hasFilters = searchParams.q || searchParams.ciudad !== 'Todas' || 
                     searchParams.precio !== 'all' || searchParams.categoria !== 'Todos';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Resultados header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {searchParams.q ? `Resultados para "${searchParams.q}"` : 'Resultados de búsqueda'}
        </h1>
        <p className="text-gray-600">
          {eventos.length} {eventos.length === 1 ? 'evento encontrado' : 'eventos encontrados'}
        </p>

        {/* Filtros activos */}
        {hasFilters && (
          <div className="flex flex-wrap gap-2 mt-4">
            {searchParams.ciudad && searchParams.ciudad !== 'Todas' && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                📍 {searchParams.ciudad}
              </span>
            )}
            {searchParams.categoria && searchParams.categoria !== 'Todos' && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                🎭 {searchParams.categoria}
              </span>
            )}
            {searchParams.precio && searchParams.precio !== 'all' && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                💰 {searchParams.precio === '0' ? 'Gratis' : `Hasta S/ ${searchParams.precio}`}
              </span>
            )}
            <button
              onClick={() => (window.location.href = '/')}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Resultados */}
      {eventos.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg
            className="w-16 h-16 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-600 text-lg font-medium mb-2">No encontramos eventos</p>
          <p className="text-gray-500 text-sm mb-6">
            Intenta ajustar tus filtros o realiza una nueva búsqueda
          </p>
          <button
            onClick={() => (window.location.href = '/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Ver todos los eventos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventos.map((evento) => (
            <EventCard key={evento.id} evento={evento} />
          ))}
        </div>
      )}
    </div>
  );
}