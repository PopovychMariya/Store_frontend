import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../utils/Auth';
import DeleteModal from '../components/Delete';

const Profile = () => {
    const { token } = useAuth();
    const [profileData, setProfileData] = useState({
        user: {
            username: '',
            password: '',
            email: '',
            first_name: '',
            last_name: '',
            user_type: ''
        },
        store_name: '',
        store_description: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editable, setEditable] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const formFields = [
        { name: 'username', label: 'Username', type: 'text', required: true },
        { name: 'password', label: 'Password', type: 'password', required: false },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'first_name', label: 'First Name', type: 'text', required: true },
        { name: 'last_name', label: 'Last Name', type: 'text', required: true },
    ];

    const sellerFields = [
        { name: 'store_name', label: 'Store Name', type: 'text', required: false },
        { name: 'store_description', label: 'Store Description', type: 'text', required: false },
    ];

    useEffect(() => {
        if (token) {
            axios.get('/api/accounts/view/', {
                headers: { Authorization: `Token ${token}` }
            })
            .then(response => {
                console.log('User data fetched successfully:', response.data);
                setProfileData({
                    user: {
                        ...response.data.user,
                        user_type: response.data.user_type
                    },
                    store_name: response.data.store_name || '',
                    store_description: response.data.store_description || ''
                });
                setError(null);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                setError('Failed to fetch profile data.');
            })
            .finally(() => {
                setLoading(false);
            });
        } else {
            setError('You\'re not logged in.');
            setLoading(false);
        }
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (formFields.some(field => field.name === name)) {
            setProfileData(prevState => ({
                ...prevState,
                user: {
                    ...prevState.user,
                    [name]: value
                }
            }));
        } else {
            setProfileData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async () => {
        const dataToSend = {
            user: {
                username: profileData.user.username,
                email: profileData.user.email,
                first_name: profileData.user.first_name,
                last_name: profileData.user.last_name,
            },
            store_name: profileData.store_name,
            store_description: profileData.store_description,
        };

        if (profileData.user.password) {
            dataToSend.user.password = profileData.user.password;
        }
    
        console.log('Data being sent to API:', JSON.stringify(dataToSend, null, 2));
    
        try {
            const response = await axios.put('/api/accounts/update/', dataToSend, {
                headers: { Authorization: `Token ${token}` }
            });
            setEditable(false);
            setError(null);
        } catch (error) {
            console.error('Error updating profile:', error.response.data);
            setError('Failed to update profile. Please check your input.');
        }
    };

    const renderFormFields = (fields) => {
        return fields.map((field) => (
            <div key={field.name} className="mb-3">
                <label htmlFor={field.name}><strong>{field.label}:</strong></label>
                {editable ? (
                    <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={profileData.user[field.name] || profileData[field.name] || ''}
                        onChange={handleChange}
                        className="form-control"
                        required={field.required}
                    />
                ) : (
                    <span> {profileData.user[field.name] || profileData[field.name]}</span>
                )}
            </div>
        ));
    };

    if (loading) return <p>Loading...</p>;

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger text-center" style={{ maxWidth: '500px', margin: '0 auto' }}>
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2>Profile</h2>

            {/* Basic User Information */}
            <div className="card mt-3">
                <div className="card-body">
                    <h3>Basic Information</h3>
                    {renderFormFields(formFields)}
                </div>
            </div>

            {/* Additional Information Based on User Type */}
            <div className="card mt-3">
            <div className="card-body">
            {profileData.user.user_type === 'seller' && (
                <>
                <h3>Store Information</h3>
                {renderFormFields(sellerFields)}
                <ul className="list-group list-group-flush mt-3">
                    <li className="list-group-item">
                        <Link className="btn btn-dark" to="/seller/products">View Shop Information</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="btn btn-dark" to="/seller/orders">View Customers Orders</Link>
                    </li>
                </ul>
                </>
            )}
            {profileData.user.user_type === 'customer' && (
            <>
                <h3>Order History</h3>
                <ul className="list-group list-group-flush mt-3">
                    <li className="list-group-item">
                        <Link className="btn btn-dark" to="/order-history">View Order History</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="btn btn-dark" to="/cart">View Cart</Link>
                    </li>
                </ul>
            </>
            )}
        </div>
        </div>
            {/* Buttons at the End of the Page */}
            <div className="d-flex justify-content-start mt-3">
                {editable ? (
                    <>
                        <button className="btn btn-success me-2" onClick={handleSubmit}>Submit</button>
                        <button className="btn btn-secondary" onClick={() => setEditable(false)}>Cancel</button>
                    </>
                ) : (
                    <button className="btn btn-primary me-2" onClick={() => setEditable(true)}>Edit Profile</button>
                )}
            </div>

            {/* Delete Account Button at the Bottom */}
            <div className="d-flex justify-content-start mt-3">
                <button className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>Delete Account</button>
            </div>

            {/* Delete Account Modal */}
            <DeleteModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} />
        </div>
    );
};

export default Profile;