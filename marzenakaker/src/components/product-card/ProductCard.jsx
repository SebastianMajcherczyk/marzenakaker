import React, { useContext, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './product-card.css';
import { useNavigate } from 'react-router-dom';
import {
	FaChevronCircleLeft,
	FaChevronCircleRight,
	FaChevronCircleUp,
} from 'react-icons/fa';
import { AppContext } from '../../ContextProvider';
import { useEffect } from 'react';
import { productsService } from '../../services/products.service';
export const ProductCard = () => {
	const { filteredProductIds } = useContext(AppContext);
	const navigate = useNavigate();
	const { id } = useParams();
	const [product, setProduct] = useState(null);

	useEffect(() => {
		(async () => {
			const data = await productsService.getProductById(id);
			setProduct(data);
		})();
	}, [id]);

	const path = process.env.PUBLIC_URL;

	//const product = useMemo(()=>  products.find(({ id: elId }) => id == elId), [products]);

	const photos = useMemo(() => product?.photos || [], [product]);
	const isNavigationBtnsActive = filteredProductIds.length > 0;
	const isFirstInFilteredProductIds =
		filteredProductIds.indexOf(product?.id) === 0;
	const isLastInFilteredProductIds =
		filteredProductIds.indexOf(product?.id) === filteredProductIds.length - 1;

	return (
		<div className='product-card-box'>
			<div className='arrow-box'>
				<div className='arrow-element side-arrow'>
					<button
						disabled={!isNavigationBtnsActive && isFirstInFilteredProductIds}>
						<FaChevronCircleLeft
							className='arrow'
							onClick={() => {
								if (!isFirstInFilteredProductIds) {
									const prevIndexInFilteredIds =
										filteredProductIds.indexOf(product.id) - 1;
									const prevId = filteredProductIds[prevIndexInFilteredIds];
									navigate(`/products/${prevId}`);
								}
							}}
						/>
						<p> Previous</p>
					</button>
				</div>
				<div className='arrow-element up-arrow'>
					<button
						disabled={!isNavigationBtnsActive && isLastInFilteredProductIds}>
						<FaChevronCircleUp
							className='arrow'
							onClick={() => {
								navigate(`/products`);
							}}
						/>
						<p>Return</p>
					</button>
				</div>
				<div className='arrow-element side-arrow'>
					<FaChevronCircleRight
						className='arrow '
						onClick={() => {
							if (!isLastInFilteredProductIds) {
								const nextIndexInFilteredIds =
									filteredProductIds.indexOf(product.id) + 1;
								const nextId = filteredProductIds[nextIndexInFilteredIds];
								navigate(`/products/${nextId}`);
							}
						}}
					/>
					<p>Next</p>
				</div>
			</div>

			<Carousel
				showThumbs={false}
				width='100%'
				infiniteLoop={true}
				autoPlay={true}
				showArrows={true}>
				{photos.map(photo => (
					<div>
						<img src={path + photo.src} alt='cake'/>
					</div>
				))}
			</Carousel>
			<div className='productCard'>
				<h3>Name: {product?.name}</h3>
				<p>Description: {product?.description}</p>
				<p>Category: {product?.category}</p>
				<p>Subategory: {product?.subcategory}</p>
				<p>Weight: {product?.weight} kg</p>{' '}
				<p>For {product?.persons} persons</p>
				<p> Składniki: {product?.ingredients.join(', ')} </p>
			</div>
		</div>
	);
};
