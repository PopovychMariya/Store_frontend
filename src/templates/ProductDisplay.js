import React from 'react';
import ProductContainer from './ProductContainer';

const ProductDisplay = ({ title, subtitle, products }) => {
	return (
		<div className="container mt-4">
			{title && <h2 className="text-center">{title}</h2>}
			{subtitle && <p className="text-center text-muted">{subtitle}</p>}
			<div className="row">
				{products.map((product, index) => (
					<div className="col-12 mb-3" key={index}>
						<ProductContainer id={product.id} name={product.name} price={product.price} />
					</div>
				))}
			</div>
		</div>
	);
};

export default ProductDisplay;