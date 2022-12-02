import './product.css';


const Product = ({ product }) => {
	const path = process.env.PUBLIC_URL;
	const mainPhoto = product.photos.find(element => element.type === 'main')
	
	return (
		<div className='product-card'>
			<div className='image-box'>
			
				<img
					src={ path + mainPhoto.src
					}
					alt={mainPhoto.alt}
				/>
				
			</div>
			<div className='text-box'>
				<p className='p1'>{product.name}</p>
				<p className='p2'>{product.description.substr(0, 105)}</p>
			</div>
		</div>
	);
};

export default Product;
