import React, { createContext, useState, useEffect, useRef } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const initialLoad = useRef(true);

    useEffect(() => {
        if (initialLoad.current) {
            const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
            setCartItems(savedCart);
            initialLoad.current = false;
        }
    }, []);

    useEffect(() => {
        if (!initialLoad.current) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems]);

    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: product.quantity }
                    : item
            ));
        } else {
            setCartItems([...cartItems, product]);
        }
    };

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};