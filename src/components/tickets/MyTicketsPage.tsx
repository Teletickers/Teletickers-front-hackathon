import ApolloWrapper from '../providers/ApolloWrapper';
import MyTickets from './MyTickets';
import Sidebar from '../ui/Sidebar';
import Header from '../ui/Header';
import Footer from '../ui/Footer';

export default function MyTicketsPage() {
  return (
    <>
      <Sidebar />
      <div className="ml-12">
        <Header />
        <ApolloWrapper>
          <MyTickets />
        </ApolloWrapper>
        <Footer />
      </div>
    </>
  );
}