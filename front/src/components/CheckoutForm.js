import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Grid,
    RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@mui/material';

import axios from 'axios';

import { useAuth } from '../context/AuthContext';
import setCarrito from './CarritoModal'

import API_BASE_URL from '../ApiConfig';

const CheckoutForm = ({ carrito, handleClose }) => {
  const { authUser } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    dni: '',
    direccion: '',
    referencias: '',
    distrito: '',
    departamento: '',
    codigo_postal: '',
    numero_celular: '',
    metodo_pago: 'contra_entrega', 
    numero_tarjeta: '',
    fecha_vencimiento: '',
    cvv: ''
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const [totalAmount, setTotalAmount] = useState(0);
  const DELIVERY_COST = 8;

  useEffect(() => {
    // Calculate total amount
    const carritoTotal = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
    setTotalAmount(carritoTotal + DELIVERY_COST);
  }, [carrito]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/comprar`, {
        ...formData,
        id_cliente: authUser.id_cliente,
        carrito,
      });
      console.log('Response:', response);
      if (response.status === 201) {
        setSnackbarMessage('Compra realizada exitosamente');
        setSnackbarOpen(true);
        setTimeout(() => {
            handleClose();
          }, 1000);
      }
    } catch (error) {
      setSnackbarMessage('Error al realizar la compra');
      setSnackbarOpen(true);
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Datos de Envío y Pago
        </Typography>
        <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Nombre(s)"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Apellidos"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label="DNI / CE (para boleta) o N° RUC (para factura)"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Dirección + N° de dpto./ofic./piso"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Referencias para llegar"
                name="referencias"
                value={formData.referencias}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Distrito"
                    name="distrito"
                    value={formData.distrito}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Departamento"
                    name="departamento"
                    value={formData.departamento}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Código postal (opcional)"
                    name="codigo_postal"
                    value={formData.codigo_postal}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label="Número de celular"
                name="numero_celular"
                value={formData.numero_celular}
                onChange={handleChange}
                margin="normal"
              />
              <FormControl component="fieldset">
                <FormLabel component="legend">Método de Pago</FormLabel>
                <RadioGroup
                  aria-label="metodo_pago"
                  name="metodo_pago"
                  value={formData.metodo_pago}
                  onChange={handleChange}
                >
                  <FormControlLabel value="tarjeta" control={<Radio />} label="Tarjeta" />
                  <FormControlLabel value="contra_entrega" control={<Radio />} label="Contra Entrega" />
                </RadioGroup>
              </FormControl>
              {formData.metodo_pago === 'tarjeta' && (
                <>
                  <TextField
                    fullWidth
                    label="Número de Tarjeta"
                    name="numero_tarjeta"
                    value={formData.numero_tarjeta}
                    onChange={handleChange}
                    margin="normal"
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Fecha de Vencimiento"
                        name="fecha_vencimiento"
                        value={formData.fecha_vencimiento}
                        onChange={handleChange}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="CVV"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                </>
              )}
              <Typography variant="h6">
                Total a pagar: S/. {totalAmount.toFixed(2)}
              </Typography>
              <Typography variant="body2">
                (Incluye S/. {DELIVERY_COST} de costo de delivery)
              </Typography>
              <Typography variant="body2">
                Los productos llegarán entre 7 a 21 días.
              </Typography>
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary"sx={{ mt: 2 }}>
            Realizar Pago
          </Button>
        </form>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </>
  );
};

export default CheckoutForm;
