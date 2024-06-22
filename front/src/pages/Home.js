import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../ApiConfig';

import ProductCard from '../components/ProductCard';

const Home = () => {
  const [facialCareProducts, setFacialCareProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFacialCareProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products/facial-care`);
        setFacialCareProducts(response.data);
      } catch (error) {
        console.error('Error fetching facial care products:', error);
      }
    };

    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products/featured`);
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFacialCareProducts();
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="container mt-5">
        <div className="row">
            <div className="col-12 text-center">
                <h1 className="display-4">Cuidado Facial</h1>
                <p className="lead">Revisa las ofertas de la semana</p>
            </div>
        </div>
        <div className="row justify-content-center">
          {facialCareProducts.map(product => (
            <ProductCard key={product.id} {...product}/>
          ))}
        </div>

        <div className="row mt-5">
            <div className="col-12 text-center">
                <h2 className="display-4">Destacados</h2>
            </div>
        </div>

        <div className="row justify-content-center">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} {...product}/>
          ))}
        </div>
    </div>
  );
};

export default Home;
