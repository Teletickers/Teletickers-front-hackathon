// src/lib/graphql/mutations.ts
import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        nombre
        email
        dni
      }
      token
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register(
    $nombre: String!
    $email: String!
    $password: String!
    $dni: String!
    $numero_cel: String
  ) {
    register(
      nombre: $nombre
      email: $email
      password: $password
      dni: $dni
      numero_cel: $numero_cel
    ) {
      user {
        id
        nombre
        email
        dni
      }
      token
    }
  }
`;