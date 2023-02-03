import React, { useContext, useState, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './product-card.css';
import { useNavigate } from 'react-router-dom';
import {
	FaChevronLeft,
	FaChevronRight,
	FaChevronUp,
	FaHotdog,
} from 'react-icons/fa';
import { AppContext } from '../../ContextProvider';
import { useEffect } from 'react';
import { productsService } from '../../services/products.service';
import { useTranslation } from 'react-i18next';
import { storageService } from '../../services/storage.service';

export const ProductCard = () => {
	const ref = useRef();
	const { filteredProductIds, language } = useContext(AppContext);
	const navigate = useNavigate();
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const { t } = useTranslation();
	const [urlsConfig, setUrlsConfig] = useState([]);

	// SWIPE - START
	const [touchStart, setTouchStart] = useState(null);
	const [touchEnd, setTouchEnd] = useState(null);
	const minSwipeDistance = 50;

	const onTouchStart = e => {
		setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
		setTouchStart(e.targetTouches[0].clientX);
	};

	const onTouchMove = e => setTouchEnd(e.targetTouches[0].clientX);
	const onTouchEnd = () => {
		if (!touchStart || !touchEnd) return;
		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > minSwipeDistance;
		const isRightSwipe = distance < -minSwipeDistance;

		if (isLeftSwipe) {
			next();
		} else if (isRightSwipe) {
			previous();
		}
		return;
		// add your conditional logic here
	};
	//SWIPE-END

	const getUrlByFileName = fileName => {
		return urlsConfig.find(config => config.fileName === fileName)?.url;
	};
	useEffect(() => {
		//Force click on dot in react-responsive-carousel to start autoplay

		if (ref.current) {
			setTimeout(() => {
				const dot = ref.current.querySelector('li.dot');
				dot?.click();
			}, 500);
		}
		//ref.current?.click();
	}, []);
	useEffect(() => {
		(async () => {
			if (product) {
				const promiseArray = [];
				const photoFileNameArray = [];
				product.photos.forEach(photo => {
					if (photo.fileName) {
						const path = `${product.id}/${photo.fileName}`;
						promiseArray.push(storageService.getImageById(path));
						photoFileNameArray.push(photo.fileName);
					}
				});
				const urls = await Promise.all(promiseArray);
				const configs = urls.map((url, index) => ({
					url,
					fileName: photoFileNameArray[index],
				}));

				setUrlsConfig(configs);
			}
		})();
	}, [product]);
	useEffect(() => {
		(async () => {
			const data = await productsService.getProductById(id);
			setProduct(data);
		})();
	}, [id]);
	const path = process.env.PUBLIC_URL;

	const next = () => {
		if (!isLastInFilteredProductIds) {
			const nextIndexInFilteredIds = filteredProductIds.indexOf(product.id) + 1;
			const nextId = filteredProductIds[nextIndexInFilteredIds];
			navigate(`/products/${nextId}`);
		}
	};

	const previous = () => {
		if (!isFirstInFilteredProductIds) {
			const prevIndexInFilteredIds = filteredProductIds.indexOf(product.id) - 1;
			const prevId = filteredProductIds[prevIndexInFilteredIds];
			navigate(`/products/${prevId}`);
		}
	};

	const photos = useMemo(() => product?.photos || [], [product]);

	const isNavigationBtnsActive = filteredProductIds.length > 0;
	const isFirstInFilteredProductIds =
		filteredProductIds.indexOf(product?.id) === 0;
	const isLastInFilteredProductIds =
		filteredProductIds.indexOf(product?.id) === filteredProductIds.length - 1;

	const disabledRight = !isNavigationBtnsActive || isLastInFilteredProductIds;
	const disabledLeft = !isNavigationBtnsActive || isFirstInFilteredProductIds;

	return (
		<div className='product-card-box'>
			<div className='up-arrow'>
				<button
					onClick={() => {
						navigate(`/products`);
					}}>
					<FaChevronUp />
					<p>{t('RETURN')}</p>
				</button>
			</div>

			<div
				className='card'
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}>
				<div className='image-container' ref={ref}>
					<Carousel
						autoFocus={true}
						selectedItem={-1}
						showThumbs={false}
						width='100%'
						infiniteLoop={true}
						autoPlay={true}
						interval={2000}
						showArrows={false}
						stopOnHover={false}
						showStatus={false}
						swipeable={false}
						transitionTime={750}>
						{photos.map(photo => (
							<div key={photo.fileName}>
								{' '}
								{photo.fileName ? (
									<img src={getUrlByFileName(photo.fileName)} alt='cake' />
								) : (
									<img src={path + photo.src} alt='cake' />
								)}
							</div>
						))}
					</Carousel>
					<button
						onClick={previous}
						className={`arrow previous ${disabledLeft ? 'disabled' : ''}`}>
						<FaChevronLeft className='fa-chevron-left' />
					</button>
					<button
						onClick={next}
						className={`arrow next ${disabledRight ? 'disabled' : ''}`}>
						<FaChevronRight className='fa-chevron-right' />
					</button>
				</div>
				<div className='productCard'>
					<h3>
						{t('NAME')}: {product?.name[language]}
					</h3>
					<p>
						{t('DESCRIPTION')}: {product?.description[language]}
					</p>
					<p>
						{t('CATEGORY')}: {product?.category}
					</p>
					<p>
						{t('SUBCATEGORY')}: {product?.subcategory}
					</p>
					<p>
						{t('WEIGHT')}: {product?.weight} kg
					</p>{' '}
					<p>
						{t('FOR')} {product?.persons} {t('PERSONS')}
					</p>
					<p>
						{t('INGREDIENTS')}: {product?.ingredients.join(', ')}{' '}
					</p>
				</div>
			</div>
		</div>
	);
};
