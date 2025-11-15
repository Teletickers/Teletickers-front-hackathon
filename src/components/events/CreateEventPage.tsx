// src/components/events/CreateEventPage.tsx
import ApolloWrapper from '../providers/ApolloWrapper';
import CreateEventFlow from './CreateEventFlow';

export default function CreateEventPage() {
  return (
    <ApolloWrapper>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Crear Nuevo Evento</h1>
        <CreateEventFlow />
      </div>
    </ApolloWrapper>
  );
}