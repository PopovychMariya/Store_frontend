import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductDisplay from '../../templates/ProductDisplay';

const ShopPage = () => {
    const { seller_id } = useParams();
    const [products, setProducts] = useState([]);
    const [sellerName, setSellerName] = useState('');
    const [storeDescription, setStoreDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`/api/seller/${seller_id}`)
            .then(response => {
                if (response.data.length > 0) {
                    const combinedData = response.data.reduce((accumulator, currentValue) => {
                        if (!accumulator.store_name) {
                            accumulator.store_name = currentValue.store_name;
                            accumulator.store_description = currentValue.store_description;
                            accumulator.products = [];
                        }
                        accumulator.products = accumulator.products.concat(currentValue.products);
                        return accumulator;
                    }, {});

                    setSellerName(combinedData.store_name || '');
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
    }, [seller_id]);

    return (
        <div className="shop-page">
            {loading && <p>Loading products...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!loading && !error && (
                <ProductDisplay
                    title={sellerName}
                    subtitle={storeDescription}
                    products={products}
                />
            )}
        </div>
    );
};

export default ShopPage;