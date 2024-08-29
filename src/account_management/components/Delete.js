import React, { useState } from 'react';
import axios from 'axios';
import Modal from '../../templates/Modal';
import { useAuth } from '../../utils/Auth';

const DeleteModal = ({ show, onClose}) => {
    const { token, logout } = useAuth();
    const [error, setError] = useState(false);

    const handleDelete = () => {
        axios.delete('/api/accounts/delete/', {
            headers: { Authorization: `Token ${token}` }
        })
        .then(() => {
            console.log('Account deleted successfully');
            logout();
        })
        .catch(error => {
            console.error('Error deleting account:', error);
            setError('Failed to delete the account. Please try again later.');
            logout();
        });
    };

    return (
        <Modal title="Confirm Deletion" show={show} onClose={onClose}>
            <p>{"Are you sure you want to delete your account? This action cannot be undone."}</p>
            {error && <div className="alert alert-danger">{error}</div>}  {/* Display error if present */}
            <div className="d-flex justify-content-end">
                <button className="btn btn-danger me-2" onClick={handleDelete}>Delete</button>
                <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            </div>
        </Modal>
    );
};

export default DeleteModal;