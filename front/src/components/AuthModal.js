import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, 
  Button, Switch, FormControlLabel, Snackbar } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

import axios from 'axios';

import API_BASE_URL from '../ApiConfig';

const AuthModal = ({ open, handleClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo_electronico: '',
    contrasenia: '',
    id_tipocliente: ''
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  const toggleMode = () => setIsLogin(!isLogin);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post(`${API_BASE_URL}/login`, {
          correo_electronico: formData.correo_electronico,
          contrasenia: formData.contrasenia
        });
        if (response.status === 200) {
          setAuthUser(response.data.user);
          localStorage.setItem('cliente_id', response.data.id_cliente);
          setSnackbarMessage('Bienvenid@');
          setSnackbarOpen(true);
          navigate('/');
        }
      } else {
        const response = await axios.post(`${API_BASE_URL}/registro`, formData);
        if (response.status === 201) {
          setSnackbarMessage('Registro exitoso, por favor inicia sesión');
          setSnackbarOpen(true);
        }
      }
      handleClose();
    } catch (error) {
      setSnackbarMessage(error.response?.data?.message || 'Error en la autenticación');
      setSnackbarOpen(true);
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            {isLogin ? 'Iniciar Sesión' : 'Registro'}
          </Typography>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Apellido"
                  name="apellido"
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Tipo Cliente: Normal(1) / Juridico (2)"
                  name="id_tipocliente"
                  onChange={handleChange}
                />
              </>
            )}
            <TextField
              margin="normal"
              fullWidth
              label="Correo Electrónico"
              name="correo_electronico"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Contraseña"
              type="password"
              name="contrasenia"
              onChange={handleChange}
            />
            <Button variant="contained" color="primary" type="submit">
              {isLogin ? 'Iniciar Sesión' : 'Registro'}
            </Button>
          </form>
          <FormControlLabel
            control={<Switch checked={!isLogin} onChange={toggleMode} />}
            label={isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
          />
        </Box>
      </Modal>
      <Snackbar
        sx={{background:'#FF6128'}}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
};

export default AuthModal;
