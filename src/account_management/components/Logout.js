import React from 'react';
import axios from 'axios';
import { useAuth } from '../../utils/Auth';
import Modal from '../../templates/Modal';

const Logout = ({ show, onClose }) => {
    const { token, logout } = useAuth();

    const handleLogout = () => {
        if (token) {
            axios.post('/api/accounts/logout/', {}, {
                headers: { Authorization: `Token ${token}` }
            })
            .then(() => {
                console.log('Logout successful');
                logout();
                onClose();
            })
            .catch(error => {
                console.error('Logout failed', error);
                logout();
                onClose();
            });
        } else {
            onClose();
        }
    };

    return (
        <Modal title="Confirm Logout" show={show} onClose={onClose}>
            <p>Are you sure you want to logout?</p>
            <div className="d-flex justify-content-end">
                <button onClick={handleLogout} className="btn btn-danger me-2">Logout</button>
                <button onClick={onClose} className="btn btn-secondary">Cancel</button>
            </div>
        </Modal>
    );
};

export default Logout;