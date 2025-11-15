import ApolloWrapper from './providers/ApolloWrapper';
import EventList from './events/EventList';
import Sidebar from './ui/Sidebar';
import SearchBar from './ui/SearchBar';
import Header from './ui/Header';
import Footer from './ui/Footer';

export default function HomePage() {
  return (
    <>
      <Sidebar />
      <div className="ml-14">
        <Header />
        <ApolloWrapper>
          <div className="container mx-auto px-4 py-8">
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-2 text-center">Descubre eventos increíbles</h1>
              <p className="text-gray-600 text-center mb-6">Encuentra y compra entradas para los mejores eventos</p>
            </header>
            <SearchBar />
            <EventList />
          </div>
        </ApolloWrapper>
        <Footer />
      </div>
    </>
  );
}