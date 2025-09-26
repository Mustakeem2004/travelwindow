import { useState } from 'react';   
import Navbar from './components/Navbar';
import './index.css';
import Hero from './components/Hero';
import { hotels } from './components/Pages/dummyHotels';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from './components/Pages/About';
import Contact from './components/Pages/Contact';
import Home from './components/Pages/Home';
// import Hotels from './components/Pages/Hotels';
import NotFound from './components/Pages/Notfound';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Signup from './components/Pages/Signup';
import Login from './components/Pages/Login';
import Bookings from './components/Pages/Bookings';
import { AuthProvider } from './context/AuthContext';
import HotelDetails from './components/HotelDetails';
import HotelList from './components/HotelList';
import { SearchProvider } from './context/SearchContext';
import Cart from './components/Cart';
import { CartProvider } from "./context/CartContext";
import { HotelProvider } from './context/HotelContext';
function App() {
 // your test user

  return (
    <AuthProvider>
    <CartProvider >
      <SearchProvider>
        <HotelProvider>
          <Router>
            <ScrollToTop />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hotels/:city" element={<HotelList />} />
              <Route path="/hotels/:city/:id" element={<HotelDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </Router>
          </HotelProvider>
      </SearchProvider>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;

