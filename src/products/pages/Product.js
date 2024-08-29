import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../../utils/UserContext';
import CartPanel from '../../customer/components/CartPanel';

const ProductDetail = () => {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get(`/api/products/${id}/`)
            .then(response => {
                setProduct(response.data);
                setError(false);
            })
            .catch(() => {
                setError(true);
            });
    }, [id]);

    if (error) {
        return (
            <div className="alert alert-danger text-center" role="alert">
                Sorry, there was an issue loading the product. Please try again later.
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center mt-5">
                <p>Loading product details...</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="d-flex flex-column align-items-start">
                <h1 className="mb-3">{product.name}</h1>
                <p className="h4 mb-3">Price: ${product.price}</p>
                <p className="mb-2">Seller: <Link to={`/shop/${product.seller_id}`}>Visit Seller's Shop</Link></p>
                <p className="text-muted mb-5">{product.description}</p>
                <p className={`badge ${product.in_stock ? 'bg-success' : 'bg-danger'}`}>
                    {product.in_stock ? 'In Stock' : 'Out of Stock'}
                </p>

                {/* Conditionally render the CartPanel for customers */}
                {user && user === 'customer' && (
                    <CartPanel product={product} />
                )}
            </div>
        </div>
    );
};

export default ProductDetail;