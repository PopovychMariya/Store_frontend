import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../utils/Auth';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    in_stock: true
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories from the API
    axios.get('/api/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories.');
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalFormData = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      category: formData.category,
      in_stock: formData.in_stock
    };
    console.log('Submitting data:', finalFormData);

    try {
      const response = await axios.post(`/api/products/`, finalFormData, {
        headers: { Authorization: `Token ${token}` }
      });
      console.log('Response:', response);
      setError(null);
      setSuccess(true);
      setTimeout(() => navigate('/seller/products'), 2000);  // Redirect after 2 seconds
    } catch (error) {
      console.error('Error:', error);
      setError('Product creation failed. Please try again.');
      setSuccess(false);
    }
  };

  const formFields = [
    { name: 'name', label: 'Product Name', type: 'text', required: true },
    { name: 'description', label: 'Product Description', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'text', required: true },
    { name: 'in_stock', label: 'In Stock', type: 'checkbox', required: false },
  ];

  const renderFields = (fields) => {
    return fields.map((field) => (
      <div key={field.name} className="mb-3">
        <label htmlFor={field.name} className="form-label">{field.label}</label>
        {field.type === 'checkbox' ? (
          <input
            type={field.type}
            className="form-check-input"
            id={field.name}
            name={field.name}
            checked={formData[field.name]}
            onChange={handleChange}
          />
        ) : (
          <input
            type={field.type}
            className="form-control"
            id={field.name}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            required={field.required}
          />
        )}
      </div>
    ));
  };

  const renderCategoryDropdown = () => {
    return (
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <select
          id="category"
          name="category"
          className="form-select"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className="container mt-5">
      {success ? (
        <div className="alert alert-success">
          Product created successfully! Redirecting to your shop...
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3>Create New Product</h3>
          {renderFields(formFields)}
          {renderCategoryDropdown()} {/* Add category dropdown */}
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-success">Create Product</button>
        </form>
      )}
    </div>
  );
};

export default CreateProduct;