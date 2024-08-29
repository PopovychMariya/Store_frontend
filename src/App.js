import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Homepage from './products/pages/Homepage';
import Product from './products/pages/Product';
import Register from './account_management/pages/Registration';
import Profile from './account_management/pages/Profile';
import CartPage from './customer/pages/Cart';
import OrderHistory from './customer/pages/OrderHistory';
import SellerOrdersPage from './seller/pages/ShopOrders.js';
import CreateProduct from './seller/pages/CreateProduct.js';
import CategoryPage from './products/pages/Category';
import ShopPage from './products/pages/Shop';
import SellerShopPage from './seller/pages/SellerShopPage';
import { CartProvider } from './utils/CartContext';
import { UserProvider } from './utils/UserContext';
import ProtectedCustomerRoute from './utils/ProtectedRoutes';

function App() {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
                e.preventDefault();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
		<UserProvider> 
		<CartProvider>
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />} />
				<Route path="/category/:id" element={<CategoryPage />} />
				<Route path="/shop/:seller_id" element={<ShopPage />} />
				<Route path="/product/:id" element={<Product />} />
                <Route
                    path="/cart"
                    element={
                        <ProtectedCustomerRoute allowedRoles={['customer']}>
                            <CartPage />
                        </ProtectedCustomerRoute>
                    }
                />
                <Route
                    path="/order-history"
                    element={
                        <ProtectedCustomerRoute allowedRoles={['customer']}>
                            <OrderHistory />
                        </ProtectedCustomerRoute>
                    }
                />
                <Route path="/registration" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/seller/products" element={<SellerShopPage />} />
                <Route path="/seller/orders" element={<SellerOrdersPage />} />
                <Route path="/seller/products/create" element={<CreateProduct />} />
            </Routes>
        </Router>
		</CartProvider>
		</UserProvider>
    );
}

export default App;