// src/lib/graphql/queries.ts
import { gql } from '@apollo/client';

export const GET_EVENTOS_PUBLICADOS = gql`
  query EventosPublicados {
    eventos_publicados {
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
      miniatura
    }
  }
`;

export const GET_EVENTO = gql`
  query Evento($id: String!) {
    evento(id: $id) {
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
      miniatura
    }
  }
`;

export const SEARCH_EVENTOS = gql`
  query SearchEventos($query: String!) {
    search_eventos(query: $query) {
      id
      titulo
      descripcion
      fecha
      hora
      region
      categoria
      miniatura
    }
  }
`;