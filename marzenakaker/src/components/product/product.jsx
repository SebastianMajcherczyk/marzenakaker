import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../ContextProvider';
import { storageService } from '../../services/storage.service';
import './product.css';

const Product = ({ product }) => {
	const [url, setUrl] = useState(undefined);
	const { language } = useContext(AppContext);
	const mainPhoto =
		product.photos.find(element => element.type === 'main') ||
		product.photos.find(element => element.type === 'standard');

	const serverFilePath = `${product.id}/${mainPhoto?.fileName}`;

	useEffect(() => {
		(async () => {
			if (serverFilePath) {
				const link = await storageService.getImageById(serverFilePath);
				setUrl(link);
			}
		})();
	}, [product]);

	return (
		<div className='product-card'>
			<div className='image-box'>
				{mainPhoto && <img src={url} alt={mainPhoto.name} />}
			</div>
			<div className='text-box'>
				<p className='p1'>{product.name[language]}</p>
				<p className='p2'>{product.description[language]?.substr(0, 105)}</p>
			</div>
		</div>
	);
};

export default Product;
