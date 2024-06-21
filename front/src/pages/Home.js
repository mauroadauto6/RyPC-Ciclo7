import React, { useState, useEffect } from 'react';

import ProductCard from '../components/ProductCard';

const Home = () => {
  const [facialCareProducts, setFacialCareProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [collectionProducts, setCollectionProducts] = useState([]);

  useEffect(() => {
    // Simular la carga de datos
    const fetchData = () => {
      setFacialCareProducts([
        { id: 1, title: 'Producto 1', description: 'Descripción del producto 1', price: '10.00', image: '/path/to/image1.jpg' },
        { id: 2, title: 'Producto 2', description: 'Descripción del producto 2', price: '20.00', image: '/path/to/image2.jpg' },
      ]);

      setFeaturedProducts([
        { id: 1, title: 'Producto Destacado 1', description: 'Descripción del producto destacado 1', price: '15.00', image: '/path/to/image3.jpg' },
        { id: 2, title: 'Producto Destacado 2', description: 'Descripción del producto destacado 2', price: '25.00', image: '/path/to/image4.jpg' },
      ]);

      setCollectionProducts([
        { id: 1, title: 'Colección 1', description: 'Descripción de la colección 1', price: '30.00', image: '/path/to/image5.jpg' },
        { id: 2, title: 'Colección 2', description: 'Descripción de la colección 2', price: '40.00', image: '/path/to/image6.jpg' },
      ]);
    };

    fetchData();
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
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="row mt-5">
            <div className="col-12 text-center">
                <h2 className="display-4">Destacados</h2>
            </div>
        </div>

        <div className="row justify-content-center">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="row mt-5">
            <div className="col-12 text-center">
                <h2 className="display-4">Colecciones</h2>
            </div>
        </div>
        <div className="row justify-content-center">
          {collectionProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
    </div>
  );
};

export default Home;
