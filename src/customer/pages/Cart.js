import React, { useContext } from 'react';
import { CartContext } from '../../utils/CartContext';
import axios from 'axios';
import ProductDisplay from '../../templates/ProductDisplay';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { cartItems, setCartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const handleEmptyCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    const handleCompletePurchase = () => {
        cartItems.forEach(item => {
            const orderData = {
                product: item.id,
                quantity: item.quantity,
            };
            console.log("Order:", orderData)
            axios.post('/api/orders/create/', orderData, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` },
            })
            .then(response => {
                console.log('Order created successfully:', response.data);
            })
            .catch(error => {
                console.error('Error creating order:', error.response);
            });
        });

        handleEmptyCart();
        navigate('/order-history');
    };

    if (cartItems.length === 0) {
        return <p className="text-center mt-5">Your cart is empty.</p>;
    }

    return (
        <div className="container mt-5">
            <h2>Your Cart</h2>
            <ProductDisplay products={cartItems} />

            <div className="mt-4 d-flex justify-content-between">
                <button className="btn btn-danger" onClick={handleEmptyCart}>
                    Empty Cart
                </button>
                <button className="btn btn-success" onClick={handleCompletePurchase}>
                    Complete Purchase
                </button>
            </div>
        </div>
    );
};

export default CartPage;