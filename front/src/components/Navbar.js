import React from 'react';
import { Link } from 'react-router-dom'
import './Navbar.css'
import Banner from '../images/Navbar/tikafarma-banner.png'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';

const Navbar = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className='d-flex align-items-center left ml-auto mr-auto'>
            <a className="navbar-brand" href="#!">
                <Link to='/'><img src={Banner} alt='tikarfarma_banner'/></Link>
            </a>
        </div>
        <div className='d-flex align-items-center right ml-auto mr-auto'>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li class="nav-item mr-5">
                        <a className="nav-link" href="#!"><PersonIcon fontSize="large"/>Iniciar Sesión / <br/> Registrar</a>
                    </li>
                    <li class="nav-item ml-1">
                        <a className="nav-link" href="#!"><ShoppingCartIcon fontSize="large"/> Carrito</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
  };
  
  export default Navbar;