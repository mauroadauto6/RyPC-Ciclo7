import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import { useAuth } from '../context/AuthContext';

import Banner from '../images/Navbar/tikafarma-banner.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

import AuthModal from './AuthModal';

const Navbar = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAuthModalClose = () => setShowAuthModal(false);
  const handleAuthModalShow = () => setShowAuthModal(true);

  const { authUser, logout } = useAuth();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className='d-flex align-items-center left ml-auto mr-auto'>
          <a className="navbar-brand" href="#!">
            <Link to='/'><img src={Banner} alt='tikarfarma_banner' /></Link>
          </a>
        </div>
        <div className='d-flex align-items-center right ml-auto mr-auto'>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              {authUser ? (
                <li className="nav-item mr-5">
                  <PersonIcon fontSize="large" /> {authUser.nombre}
                  <a className="nav-link" href="#!" onClick={logout}>
                    <LogoutIcon fontSize="large" />
                  </a>
                </li>
              ) : (
                <li className="nav-item mr-5">
                  <a className="nav-link" href="#!" onClick={handleAuthModalShow}>
                    <PersonIcon fontSize="large" /> Iniciar Sesión / <br /> Registrar
                  </a>
                </li>
              )}
              <li className="nav-item ml-1">
                <button className="nav-link btn"><ShoppingCartIcon fontSize="large" /> Carrito</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <AuthModal open={showAuthModal} handleClose={handleAuthModalClose} />
    </>
  );
};

export default Navbar;
