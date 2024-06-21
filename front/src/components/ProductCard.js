import React from 'react';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductCard = ({ image, title, description, price }) => {
  return (
    <div className="col-md-4">
      <div className="card">
        <img src={image} className="card-img-top" alt="Product" />
        <div className="card-body text-center">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">Descripción: {description}</p>
          <p className="card-text">Precio: S/{price}</p>
          <a className="nav-link" href="#!">
            <ShoppingCartIcon style={{
              color: '#FF6128',
              fontSize: '50'
            }}/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
