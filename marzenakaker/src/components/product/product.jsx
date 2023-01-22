import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../ContextProvider';
import { storageService } from '../../services/storage.service';
import './product.css';

const Product = ({ product }) => {
	const [url, setUrl] = useState(undefined);
	const { language } = useContext(AppContext);

	const path = process.env.PUBLIC_URL;
	const mainPhoto = product.photos.find(element => element.type === 'main');

	const isFileFromServer = Boolean(mainPhoto?.fileName);
	const serverFilePath = isFileFromServer
		? `${product.id}/${mainPhoto?.fileName}`
		: undefined;
	const localFilePath = isFileFromServer
		? undefined
		: mainPhoto.src.startsWith('http')
		? mainPhoto.src
		: path + mainPhoto.src;

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
				{mainPhoto && (
					<img
						// src={
						// 	mainPhoto.src.startsWith('http')
						// 		? mainPhoto.src
						// 		: path + mainPhoto.src
						// }
						src={isFileFromServer ? url : localFilePath}
						alt={mainPhoto.alt}
					/>
				)}
			</div>
			<div className='text-box'>
				<p className='p1'>{product.name[language]}</p>
				<p className='p2'>{product.description[language]?.substr(0, 105)}</p>
			</div>
		</div>
	);
};

export default Product;
