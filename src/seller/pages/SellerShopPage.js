import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductDisplay from '../../templates/ProductDisplay';
import { useAuth } from '../../utils/Auth';

const SellerShopPage = () => {
    const { token } = useAuth();
    const [products, setProducts] = useState([]);
    const [sellerName, setSellerName] = useState('');
    const [storeDescription, setStoreDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/accounts/shop/', {
            headers: { Authorization: `Token ${token}` }
        })
        .then(response => {
            if (response.data.length > 0) {
                // Unpack and combine products
                const combinedData = response.data.reduce((accumulator, currentValue) => {
                    if (!accumulator.store_name) {
                        accumulator.store_name = currentValue.store_name;
                        accumulator.store_description = currentValue.store_description;
                        accumulator.products = [];
                    }
                    accumulator.products = accumulator.products.concat(currentValue.products);
                    return accumulator;
                }, {});

                setSellerName(combinedData.store_name || 'Your Shop');
                setStoreDescription(combinedData.store_description || '');
                setProducts(combinedData.products || []);
            } else {
                setError('Shop data not found.');
            }
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching seller products:', error);
            setError('Failed to load shop products.');
            setLoading(false);
        });
    }, [token]);

    return (
        <div className="container mt-5">
            {loading && <p>Loading products...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!loading && !error && (
                <ProductDisplay
                    title={sellerName}
                    subtitle={storeDescription} 
                    products={products}
                />
            )}
            <div className="mt-5 d-flex justify-content-end">
                <button className="btn btn-primary" onClick={() => navigate('/seller/products/create')}>
                    Create New Product
                </button>
            </div>
        </div>
    );
};

export default SellerShopPage;