const Product = ({ product }) => {
	return (
		<div>
			<div>
				<img src={product.photo.src} alt={product.photo.alt} />
				<div>{product.name}</div>
			</div>
			<div>
				<p>{product.description}</p>
			</div>
		</div>
	);
};

export default Product;
