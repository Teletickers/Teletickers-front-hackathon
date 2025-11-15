// src/lib/graphql/queries.ts
import { gql } from '@apollo/client';

export const GET_EVENTOS_PUBLICADOS = gql`
  query EventosPublicados {
    eventosPublicados {
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
    }
  }
`;