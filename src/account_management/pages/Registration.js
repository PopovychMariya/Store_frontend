import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../utils/Auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    store_name: '',
    store_description: ''
  });
  const [userType, setUserType] = useState('customer');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalFormData = {
      user: {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name
      },
      user_type: userType,
      store_name: userType === 'seller' ? formData.store_name : '',
      store_description: userType === 'seller' ? formData.store_description : ''
    };

    try {
      const response = await axios.post(`/api/accounts/register/`, finalFormData);
      console.log( 'Response:', response)
      setError(null);
      setSuccess(true);
    } catch (error) {
      setError('Registration failed. Please try again.');
      setSuccess(false);
    }
  };

  if (token) {
    navigate('/profile');
  }

  const formFields = [
    { name: 'username', label: 'Username', type: 'text', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'first_name', label: 'First Name', type: 'text', required: true },
    { name: 'last_name', label: 'Last Name', type: 'text', required: true },
  ];

  const sellerFields = [
    { name: 'store_name', label: 'Store Name', type: 'text', required: true },
    { name: 'store_description', label: 'Store Description', type: 'text', required: true },
  ];

  const renderFields = (fields) => {
    return fields.map((field) => (
      <div key={field.name} className="mb-3">
        <label htmlFor={field.name} className="form-label">{field.label}</label>
        <input
          type={field.type}
          className="form-control"
          id={field.name}
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          required={field.required}
        />
      </div>
    ));
  };

  return (
    <div className="container mt-5">
      {success ? (
        <div className="alert alert-success">
          Registration successful! You can now log in.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3>Register as {userType.charAt(0).toUpperCase() + userType.slice(1)}</h3>
          <div className="mb-4">
            <label htmlFor="userType" className="form-label">Account Type</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="form-select"
            >
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          {renderFields(formFields)}
          {userType === 'seller' && renderFields(sellerFields)}
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-success">Register</button>
        </form>
      )}
    </div>
  );
};

export default Register;