// src/components/HomePage.tsx
import ApolloWrapper from './providers/ApolloWrapper';
import EventList from './events/EventList';

export default function HomePage() {
  return (
    <ApolloWrapper>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Descubre eventos increíbles</h1>
          <p className="text-gray-600">Encuentra y compra entradas para los mejores eventos</p>
        </header>
        <EventList />
      </div>
    </ApolloWrapper>
  );
}