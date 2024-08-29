import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CatalogDropdown = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('/api/categories/')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="catalogDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
            </button>
            <ul className="dropdown-menu" aria-labelledby="catalogDropdown">
                {categories.length > 0 ? (
                    categories.map((category, index) => (
                        <li key={index}>
                            <Link className="dropdown-item" to={`/category/${category.id}`}>{category.name}</Link>
                        </li>
                    ))
                ) : (
                    <li><span className="dropdown-item">No categories available</span></li>
                )}
            </ul>
        </div>
    );
};

export default CatalogDropdown;