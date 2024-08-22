import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
// For toast notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
      <>
      <Header />
      <main className='py-3'>
          <Container>
            <Outlet />
          </Container>
      </main>
      <Footer />
      <ToastContainer />  {/* For toast notifications */}
      </>
  );
}