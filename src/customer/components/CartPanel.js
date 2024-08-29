import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../../utils/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPanel = ({ product }) => {
    const { addToCart, removeFromCart, cartItems } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const cartItem = cartItems.find(item => item.id === product.id);
        if (cartItem) {
            setQuantity(cartItem.quantity);
            setIsAdded(true);
        }
    }, [cartItems, product.id]);

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
        setIsAdded(true);
    };

    const handleRemoveFromCart = () => {
        removeFromCart(product.id);
        setIsAdded(false);
        setQuantity(1);
    };

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (newQuantity > 0) {
            setQuantity(newQuantity);
            addToCart({ ...product, quantity: newQuantity });
        }
    };

    const handleGoToCart = () => {
        navigate('/cart');
    };

    return (
        <div className="cart-panel mt-3">
            {!isAdded ? (
                <button className="btn btn-primary" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            ) : (
                <>
                    <input
                        type="number"
                        className="form-control mb-2"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min="1"
                    />
                    <button className="btn btn-danger me-2" onClick={handleRemoveFromCart}>
                        Remove from Cart
                    </button>
                    <button className="btn btn-secondary" onClick={handleGoToCart}>
                        Go to Cart
                    </button>
                </>
            )}
        </div>
    );
};

export default CartPanel;