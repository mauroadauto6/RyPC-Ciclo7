import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';

import AuthModal from './components/AuthModal';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleAuthModalShow = () => setIsAuthModalOpen(true);
  const handleAuthModalClose = () => setIsAuthModalOpen(false);

  return (
    <AuthProvider>
      <Router>
        <Navbar handleAuthModalShow={handleAuthModalShow} />
        <Routes>
          <Route path='/' element={<Home />} />
          {/* Otras rutas */}
        </Routes>
        <Footer />
        <AuthModal open={isAuthModalOpen} handleClose={handleAuthModalClose} />
      </Router>
    </AuthProvider>
  );
};

export default App;

