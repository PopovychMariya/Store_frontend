import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './utils/Auth';
import Login from './account_management/components/Login';
import Logout from './account_management/components/Logout';
import CatalogDropdown from './products/components/Catalog';

const Navbar = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const { token } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);

    useEffect(() => {
        setIsLoggedIn(!!token);
    }, [token]);

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">MyStore</Link>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <CatalogDropdown />
                        </li>
                    </ul>
                </div>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <button className="btn btn-outline-light me-2" onClick={() => setShowLogoutModal(true)}>Logout</button>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">Profile</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <button className="btn btn-outline-light" onClick={() => setShowLoginModal(true)}>Login</button>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/registration">Registration</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            {/* Login Modal */}
            <Login show={showLoginModal} onClose={() => setShowLoginModal(false)} />

            {/* Logout Modal */}
            <Logout show={showLogoutModal} onClose={() => setShowLogoutModal(false)} />
        </nav>
    );
};

export default Navbar;