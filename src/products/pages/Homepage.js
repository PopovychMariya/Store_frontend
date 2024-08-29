import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductDisplay from '../../templates/ProductDisplay';

const Homepage = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios.get('/api/products/')
			.then(response => {
				setProducts(response.data);
				setError(false);
				setLoading(false);
			})
			.catch(error => {
				console.error('Error fetching products:', error);
				setError('Failed to load products.');
				setLoading(false);
			});
	}, []);

	return (
		<div className="homepage">
			{loading && <p>Loading products...</p>}
			{error && <p className="text-danger">{error}</p>}
			{!loading && !error && (
				<ProductDisplay
					title="Welcome to MyStore"
					subtitle="Your one-stop shop for all your needs."
					products={products}
				/>
			)}
		</div>
	);
};

export default Homepage;