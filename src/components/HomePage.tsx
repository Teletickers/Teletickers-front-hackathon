import ApolloWrapper from './providers/ApolloWrapper';
import EventListWithSections from './events/EventListWithSections';
import Sidebar from './ui/Sidebar';
import AdvancedSearchBar from './ui/AdvancedSearchBar';
import BannerCarousel from './ui/BannerCarousel';
import Header from './ui/Header';
import Footer from './ui/Footer';

export default function HomePage() {
  return (
    <>
      <Sidebar />
      <div className="ml-12">
        <Header />
        <ApolloWrapper>
          <div className="container mx-auto px-4 py-8">
            <header className="mb-8">
            </header>
            <BannerCarousel />
            <AdvancedSearchBar />
            <EventListWithSections />
          </div>
        </ApolloWrapper>
        <Footer />
      </div>
    </>
  );
}