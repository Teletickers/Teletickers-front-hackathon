// src/components/search/SearchPage.tsx
import ApolloWrapper from '../providers/ApolloWrapper';
import SearchResults from './SearchResults';
import Sidebar from '../ui/Sidebar';
import Header from '../ui/Header';
import Footer from '../ui/Footer';

export default function SearchPage() {
  return (
    <>
      <Sidebar />
      <div className="ml-12">
        <Header />
        <ApolloWrapper>
          <SearchResults />
        </ApolloWrapper>
        <Footer />
      </div>
    </>
  );
}