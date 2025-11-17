// src/components/events/EventListWithSections.tsx
'use client';

import { useQuery } from '@apollo/client/react';
import { GET_EVENTOS_PUBLICADOS } from '../../lib/graphql/queries';
import EventCard from './EventCard';
import { useEffect, useRef, useCallback } from 'react';
import type { Evento } from '../../types';

interface EventosData {
  eventosPublicados: Evento[];
}

const ITEMS_PER_PAGE = 12;

export default function EventListWithSections() {
  const { data, loading, error, fetchMore, networkStatus } = useQuery<EventosData>(
    GET_EVENTOS_PUBLICADOS,
    {
      variables: { skip: 0, limit: ITEMS_PER_PAGE },
      notifyOnNetworkStatusChange: true,
    }
  );

  const observerTarget = useRef<HTMLDivElement>(null);
  const loadingMore = networkStatus === 4;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore && data?.eventosPublicados) {
          const currentLength = data.eventosPublicados.length;
          fetchMore({
            variables: {
              skip: currentLength,
              limit: ITEMS_PER_PAGE,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return {
                eventosPublicados: [
                  ...prev.eventosPublicados,
                  ...fetchMoreResult.eventosPublicados,
                ],
              };
            },
          });
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [data, fetchMore, loadingMore]);

  if (loading && !data) {
    return (
      <div className="text-center py-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 dark:border-green-400 border-r-transparent"></div>
        <p className="mt-4 text-gray-700 dark:text-gray-300">Cargando eventos...</p>
      </div>
    );
  }

  if (error) {
    console.log("[v0] Error loading events:", error);
    return (
      <div className="text-red-500 dark:text-red-400 text-center py-8 bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
        <p className="font-semibold">Error al cargar eventos</p>
        <p className="text-sm mt-2">{error.message}</p>
      </div>
    );
  }

  const eventos = data?.eventosPublicados || [];
  console.log("[v0] Events loaded:", eventos.length);

  if (eventos.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-600 dark:text-gray-300 text-lg">No hay eventos disponibles</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Vuelve pronto para ver nuevos eventos</p>
      </div>
    );
  }

  // Simulamos precios para la demo (en producción vendrían de la API)
  const eventosConPrecio = eventos.map(e => ({
    ...e,
    precioMinimo: Math.random() > 0.3 ? Math.floor(Math.random() * 100) : 0
  }));

  const eventosGratis = eventosConPrecio.filter(e => e.precioMinimo === 0);
  const eventosMenos15 = eventosConPrecio.filter(e => e.precioMinimo > 0 && e.precioMinimo <= 15);
  const eventosRestantes = eventosConPrecio.filter(e => e.precioMinimo > 15);

  return (
    <div className="space-y-16">
      {/* Todos los eventos */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Todos los eventos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventosRestantes.slice(0, 6).map((evento) => (
            <EventCard key={evento.id} evento={evento} />
          ))}
        </div>
      </section>

      {/* Eventos Gratis */}
      {eventosGratis.length > 0 && (
        <section className="bg-green-50 dark:bg-green-900/20 -mx-4 px-4 py-12 rounded-2xl transition-colors duration-300">
          <div className="container mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-500 dark:bg-green-600 text-white px-4 py-2 rounded-full font-bold">
                GRATIS
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Eventos gratuitos</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventosGratis.map((evento) => (
                <EventCard key={evento.id} evento={evento} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Más eventos */}
      {eventosRestantes.length > 6 && (
        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Descubre más</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventosRestantes.slice(6, 12).map((evento) => (
              <EventCard key={evento.id} evento={evento} />
            ))}
          </div>
        </section>
      )}

      {/* Eventos a menos de 15 soles */}
      {eventosMenos15.length > 0 && (
        <section className="bg-green-50 dark:bg-green-900/20 -mx-4 px-4 py-12 rounded-2xl transition-colors duration-300">
          <div className="container mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-500 dark:bg-green-600 text-white px-4 py-2 rounded-full font-bold">
                ECONÓMICOS
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Eventos desde S/ 15</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventosMenos15.map((evento) => (
                <EventCard key={evento.id} evento={evento} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Últimos eventos */}
      {eventosRestantes.length > 12 && (
        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">No te los pierdas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventosRestantes.slice(12).map((evento) => (
              <EventCard key={evento.id} evento={evento} />
            ))}
          </div>
        </section>
      )}

      {/* Infinite scroll trigger */}
      <div ref={observerTarget} className="py-8 text-center">
        {loadingMore && (
          <div className="inline-block">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 dark:border-green-400 border-r-transparent"></div>
            <p className="mt-4 text-gray-700 dark:text-gray-300">Cargando más eventos...</p>
          </div>
        )}
      </div>
    </div>
  );
}
