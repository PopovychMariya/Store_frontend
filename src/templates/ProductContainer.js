import React from 'react';
import { Link } from 'react-router-dom';

const ProductContainer = ({ id, name, price }) => {
    return (
        <Link to={`/product/${id}`} className="text-decoration-none text-dark">
            <div className="card" style={{ width: '18rem', margin: '10px' }}>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">${price}</p>
                </div>
            </div>
        </Link>
    );
};

export default ProductContainer;