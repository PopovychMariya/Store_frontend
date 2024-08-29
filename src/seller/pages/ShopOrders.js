import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../utils/Auth';

const SellerOrdersPage = () => {
    const { token } = useAuth();
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/orders/seller', {
            headers: { Authorization: `Token ${token}` }
        })
        .then(response => {
            setOrders(response.data);
            setError(null);
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
            setError('Failed to load orders.');
        });
    }, [token]);

    if (error) {
        return (
            <div className="alert alert-danger text-center mt-5" role="alert">
                {error}
            </div>
        );
    }

    if (orders.length === 0) {
        return <p className="text-center mt-5">No orders found.</p>;
    }

    return (
        <div className="container mt-5">
            <h2>Customer Orders</h2>
            <ul className="list-group mt-3">
                {orders.map((order) => (
                    <li key={order.id} className="list-group-item">
                        <strong>Product:</strong> {order.product_name} <br />
                        <strong>Customer:</strong> {order.customer_name} <br />
                        <strong>Quantity:</strong> {order.quantity} <br />
                        <strong>Date:</strong> {new Date(order.date_of_purchase).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SellerOrdersPage;