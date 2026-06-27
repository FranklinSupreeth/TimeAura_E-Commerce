import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* The Navbar is fixed or sticky depending on its own internal classes,
        ensuring it stays at the top of every page.
      */}
      <Navbar />
      
      {/* flex-grow ensures that even if a page has very little content, 
        the Footer will stay at the bottom of the screen.
      */}
      <main className="flex-grow">
        {/* This Outlet renders the specific page based on the URL 
          (Home, Shop, Product Detail, Cart, etc.)
        */}
        <Outlet />
      </main>

      {/* We use the new Footer component which contains the 
        developer profiles, location, and social links.
      */}
      <Footer />
    </div>
  );
};

export default MainLayout;