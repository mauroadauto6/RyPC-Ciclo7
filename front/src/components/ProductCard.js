import React, { useState } from 'react';
import { Snackbar } from '@mui/material';
import axios from 'axios';

import { useAuth } from '../context/AuthContext';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import API_BASE_URL from '../ApiConfig';

const ProductCard = ({ image, title, description, price, id_inventario_almacen }) => {

  const { authUser } = useAuth();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleAddToCarrito = async () => {
    if (!authUser) {
      setSnackbarMessage('Inicia sesión para añadir productos al carrito');
      setSnackbarOpen(true);
      return;
    }

    console.log('ProductCard received:', {
      title, id_inventario_almacen
    });

    try {
      const response = await axios.post(`${API_BASE_URL}/carrito`, {
        id_cliente: authUser.id_cliente,
        id_inventario_almacen: id_inventario_almacen,
        cantidad: 1
      });

      if (response.status === 201) {
        setSnackbarMessage('Producto añadido al carrito');
      } else {
        setSnackbarMessage('Error al añadir el producto al carrito');
      }
    } catch (error) {
      console.error('Error al añadir el producto al carrito:', error);
      if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      }
      setSnackbarMessage('Error al añadir el producto al carrito');
    }

    setSnackbarOpen(true);
  };


  return (
    <>
      <div className="col-md-4">
        <div className="card">
          <img src={image} className="card-img-top" alt="Product" />
          <div className="card-body text-center">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">Descripción: {description}</p>
            <p className="card-text">Precio: S/{price}</p>
            <button className="nav-link btn" onClick={handleAddToCarrito}>
              <ShoppingCartIcon style={{
                color: '#FF6128',
                fontSize: '51'
              }}/>
            </button>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </>
  );
};

export default ProductCard;
