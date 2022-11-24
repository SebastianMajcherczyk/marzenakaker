import './product.css';
import solidHeart from './heart-solid.svg';

const Product = ({ product }) => {
	const path = process.env.PUBLIC_URL;

	return (
		<div className='product-card'>
			<div className='image-box'>
				<img src={path + product.photo.src} alt={product.photo.alt} />
			</div>
			<div className='text-box'>
				<p className='p1'>{product.name}</p>
				<p className='p2'>{product.description.substr(0, 105)}</p>
			</div>
		</div>
	);
};

export default Product;
