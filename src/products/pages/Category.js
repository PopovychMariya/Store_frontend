import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductDisplay from '../../templates/ProductDisplay';

const CategoryPage = () => {
	const { id } = useParams();
	const [products, setProducts] = useState([]);
	const [categoryName, setCategoryName] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios.get(`/api/category/${id}/`)
			.then(response => {
				setCategoryName(response.data.name || 'Category');
				setProducts(response.data.products || []);
				setLoading(false);
                setError(false);
			})
			.catch(error => {
				console.error('Error fetching category products:', error);
				setError('Failed to load category products.');
				setLoading(false);
			});
	}, [id]);

	return (
		<div className="category-page">
			{loading && <p>Loading products...</p>}
			{error && <p className="text-danger">{error}</p>}
			{!loading && !error && (
				<ProductDisplay
					title={categoryName}
					subtitle={`Browse the best deals in ${categoryName}`}
					products={products}
				/>
			)}
		</div>
	);
};

export default CategoryPage;