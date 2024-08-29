import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../utils/Auth';
import Modal from '../../templates/Modal';

const Login = ({ show, onClose }) => {
    const { login } = useAuth(); // Removed 'token' since it's not used
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/accounts/login/', formData)
            .then(response => {
                const token = response.data.token;
                login(token);
                setError(null);
                console.log('Login successful');
                onClose();
            })
            .catch(error => {
                setError('Login failed', error.message);
            });
    };

    return (
        <Modal title="Login" show={show} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-control"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </Modal>
    );
};

export default Login;