import { useContext } from 'react';
import { AppContext } from '../../ContextProvider';
import './product.css';

const Product = ({ product }) => {
	const { language } = useContext(AppContext);
	const path = process.env.PUBLIC_URL;
	const mainPhoto = product.photos.find(element => element.type === 'main');

	return (
		<div className='product-card'>
			<div className='image-box'>
				<img
					src={
						mainPhoto.src.startsWith('http')
							? mainPhoto.src
							: path + mainPhoto.src
					}
					alt={mainPhoto.alt}
				/>
			</div>
			<div className='text-box'>
				<p className='p1'>{product.name[language]}</p>
				<p className='p2'>{product.description[language]?.substr(0, 105)}</p>
			</div>
		</div>
	);
};

export default Product;
