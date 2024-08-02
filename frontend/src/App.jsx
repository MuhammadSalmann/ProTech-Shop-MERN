import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

export const App = () => {
  return (
      <>
      <Header />
      <main className='py-3'>
          <Container>
          <h1>Welcome to ProTech</h1>
          <Outlet />
          </Container>
      </main>
      <Footer />
      </>
  );
}