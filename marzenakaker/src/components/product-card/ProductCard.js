import React, { useContext } from 'react';
import { initialData } from '../../initial-data';
import { useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import './product-card.css';
import { useNavigate } from 'react-router-dom';
import {
	FaChevronCircleLeft,
	FaChevronCircleRight,
	FaChevronCircleUp,
} from 'react-icons/fa';
import { AppContext } from '../../ContextProvider';
export const ProductCard = () => {
	const { filteredProductIds } = useContext(AppContext);
	const navigate = useNavigate();
	let { id } = useParams();
	const currentProductIndex = filteredProductIds.indexOf(+id);
	const path = process.env.PUBLIC_URL;
	const images = [{ original: path + initialData[id - 1].photo.src }];
	return (
		<div className='product-card-box'>
			<div className='arrow-box'>
				<div className='arrow-element side-arrow'>
					<FaChevronCircleLeft
						className='arrow'
						onClick={() => {
							if (currentProductIndex > 0) {
								navigate(
									`/products/${filteredProductIds[currentProductIndex - 1]}`
								);
							}
						}}
					/>
					<p> Previous</p>
				</div>
				<div className='arrow-element up-arrow'>
					{' '}
					<FaChevronCircleUp
						className='arrow'
						onClick={() => {
							navigate(`/products`);
						}}
					/>
					<p>Return</p>
				</div>
				<div className='arrow-element side-arrow'>
					<FaChevronCircleRight
						className='arrow '
						onClick={() => {
							if (currentProductIndex < filteredProductIds.length - 1) {
								navigate(
									`/products/${filteredProductIds[currentProductIndex + 1]}`
								);
							}
						}}
					/>
					<p>Next</p>
				</div>
			</div>
			<ImageGallery items={images} />
			<div className='productCard'>
				<h3>Name: {initialData[id - 1].name}</h3>
				<p>Description: {initialData[id - 1].description}</p>
				<p>Category: {initialData[id - 1].category}</p>
				<p>Subategory: {initialData[id - 1].subcategory}</p>
				<p>Weight: {initialData[id - 1].weight} kg</p>{' '}
				<p>For {initialData[id - 1].persons} persons</p>
				<p> Składniki: {initialData[id - 1].ingredients.join(', ')} </p>
			</div>
		</div>
	);
};
