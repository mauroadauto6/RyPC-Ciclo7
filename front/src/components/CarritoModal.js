import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, IconButton, TextField, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from 'axios';

import { useAuth } from '../context/AuthContext';
import CheckoutForm from './CheckoutForm';

import API_BASE_URL from '../ApiConfig';

const CarritoModal = ({ open, handleClose }) => {
  const { authUser } = useAuth();
  const [carrito, setCarrito] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    if (authUser) {
      fetchCarrito();
    }
  }, [authUser, open]);

  const fetchCarrito = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/carrito/${authUser.id_cliente}`);
      console.log('Carrito data:', response.data);
      setCarrito(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCantidadChange = async (id_carrito, cantidad) => {
    try {
      await axios.put(`${API_BASE_URL}/carrito/${id_carrito}`, { cantidad });
      fetchCarrito();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id_carrito) => {
    try {
      await axios.delete(`${API_BASE_URL}/carrito/${id_carrito}`);
      fetchCarrito();
    } catch (error) {
      console.error(error);
    }
  };

  const handleComprar = async () => {
    setCheckoutOpen(true);
  };

  const handleCheckoutClose = () => {
    setCheckoutOpen(false);
    // Limpia el carrito después de que se confirme la compra
    setCarrito([]);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">Carrito de Compras</Typography>
          {carrito.length === 0 ? (
            <Typography>No hay productos en el carrito</Typography>
          ) : (
            carrito.map(item => (
              <Box key={item.id_carrito} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <img src={item.url_imagen} alt={item.nombre_producto} style={{ width: 50, height: 50, marginRight: 16 }} />
                <Typography sx={{ flex: 1 }}>{item.nombre_producto}</Typography>
                <TextField
                  type="number"
                  value={item.cantidad}
                  onChange={(e) => handleCantidadChange(item.id_carrito, parseInt(e.target.value))}
                  sx={{ width: 60, marginRight: 16 }}
                />
                <IconButton onClick={() => handleDelete(item.id_carrito)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))
          )}
          <Button variant="contained" color="primary" onClick={handleComprar} sx={{ mt: 2 }}>
            Comprar
          </Button>
        </Box>
      </Modal>
      {checkoutOpen && (
        <Modal open={checkoutOpen} onClose={() => setCheckoutOpen(false)}>
          <CheckoutForm carrito={carrito} handleClose={handleCheckoutClose} />
        </Modal>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </>
  );
};

export default CarritoModal;
