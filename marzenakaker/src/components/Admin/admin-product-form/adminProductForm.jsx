import React, { useContext, useState, useMemo, useEffect } from 'react';
import { AdminContext, AppContext } from '../../../ContextProvider';
import { productsService } from '../../../services/products.service';
import { useParams, useNavigate } from 'react-router-dom';
import './admin-product-form.css';
import { Link } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';
import { uid } from 'uid';
import { storageService } from '../../../services/storage.service';
import { ConfirmToast } from 'react-confirm-toast';
import ClipLoader from 'react-spinners/ClipLoader';
import { AdminIngredientsForm } from '../admin-ingredients-form/adminIngredientsForm';

export const AdminProductForm = () => {
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(false);
	const onChange = (imageList, addUpdateIndex) => {
		// data for submit

		setImages(imageList);
	};
	const [urlsConfig, setUrlsConfig] = useState([]);
	const { categories, ingredients } = useContext(AppContext);
	const { getProducts } = useContext(AdminContext);

	const { id } = useParams();
	const navigate = useNavigate();
	const isInEditMode = useMemo(() => id !== undefined, [id]);
	const [originalProduct, setOriginalProduct] = useState(null);

	const [product, setProduct] = useState({
		name: '',
		name_en: '',
		description: '',
		description_en: '',
		weight: '',
		persons: '',
		category: '',
		subcategory: '',
		ingredients: [],
		state: 'inactive',
	});
	const [activeFoto, setActiveFoto] = useState(null);
	const [addIngerientActive, setAddIngredientActive] = useState(false);
	const loadProduct = async () => {
		const data = await productsService.getProductById(id);
		setOriginalProduct(data);
		setProduct({
			name: data.name.pl,
			name_en: data.name.en,
			description: data.description.pl,
			description_en: data.description.en,
			weight: data.weight,
			persons: data.persons,
			category: data.category,
			subcategory: data.subcategory,
			ingredients: data.ingredients,
			state: data.state,
			photos: data.photos,
		});

		const mainFoto = data.photos.find(({ type }) => type === 'main');

		setActiveFoto({
			type: 'from-server',
			name: mainFoto.fileName,
		});
	};

	useEffect(() => {
		if (isInEditMode) {
			(async () => {
				const data = await productsService.getProductById(id);
				setOriginalProduct(data);
				setProduct({
					name: data.name.pl,
					name_en: data.name.en,
					description: data.description.pl,
					description_en: data.description.en,
					weight: data.weight,
					persons: data.persons,
					category: data.category,
					subcategory: data.subcategory,
					ingredients: data.ingredients,
					state: data.state,
					photos: data.photos,
				});

				const mainFoto = data.photos.find(({ type }) => type === 'main');

				setActiveFoto({
					type: 'from-server',
					name: mainFoto.fileName,
				});
			})();
		}
	}, [isInEditMode, id]);
	const photos = useMemo(() => product?.photos || [], [product]);

	const getUrlByFileName = fileName => {
		return urlsConfig.find(config => config.fileName === fileName)?.url;
	};
	const deleteImageAndData = async (productId, photo) => {
		const path = `${productId}/${photo}`;
		await storageService.deleteImage(path);
		await productsService.deletePhotoDataByIdAndFileName(productId, photo);

		const newPhotos = photos.filter(element => element.fileName !== photo);
		setProduct({
			...product,
			photos: newPhotos,
		});
	};

	useEffect(() => {
		(async () => {
			const promiseArray = [];
			const photoFileNameArray = [];

			product?.photos?.forEach(photo => {
				if (photo.fileName) {
					const path = `${id}/${photo.fileName}`;

					//const photoId = photo.fileName.split('.')[0];
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
		})();
	}, [product]);

	const handleChange = e => {
		const { value, name, checked } = e.target;
		let tempState = {};

		if (name?.includes('-')) {
			const [groupName, itemName] = name.split('-');
			tempState = {
				...product,
				[groupName]: checked
					? [...new Set([...product[groupName], itemName])]
					: product[groupName].filter(el => el !== itemName),
			};
		} else {
			tempState = {
				...product,
				[name]: value,
			};
		}

		setProduct({
			...tempState,
		});
	};

	const saveProduct = async e => {
		e.preventDefault();
		setLoading(true);
		if (isInEditMode) {
			const productClone = { ...product, photos: [...product.photos] };

			// check in the photo list from server
			productClone.photos = productClone.photos.map(photo => {
				return {
					...photo,
					type:
						activeFoto.type === 'from-server' &&
						activeFoto.name === photo.fileName
							? 'main'
							: 'standard',
				};
			});

			for await (const imageData of images) {
				const { file } = imageData;
				const uniqueId = uid(4);
				const type = file.name.split('.').pop();
				const photoId = `${uniqueId}.${type}`;
				const path = `${id}/${photoId}`;
				await storageService.addImage(path, file);
				productClone.photos.push({
					fileName: photoId,
					name: 'Cake',
					// check in a new added photo list
					type:
						activeFoto.type === 'new' &&
						activeFoto.name === `${file.lastModified}-${file.name}`
							? 'main'
							: 'standard',
				});
			}

			await productsService.editProductByFirestoreId(
				originalProduct.firestoreId,
				productClone
			);
		} else {
			const productId = uid(4);
			const productClone = { ...product, id: productId, photos: [] };

			for await (const imageData of images) {
				const { file } = imageData;

				const id = uid(4);
				const type = file.name.split('.').pop();
				const photoId = `${id}.${type}`;
				const path = `${productId}/${photoId}`;
				await storageService.addImage(path, file);
				productClone.photos.push({
					fileName: photoId,
					name: 'Test',
					type: images.indexOf(imageData) === 0 ? 'main' : 'standard',
				});
			}
			await productsService.addProduct(productClone);
			setImages([]);
		}
		getProducts();
	};
	const saveAndStay = async e => {
		await saveProduct(e);
		await loadProduct();
		setImages([]);
		debugger;
		setLoading(false);
	};
	const saveAndExit = async e => {
		await saveProduct(e);
		setLoading(false);
		navigate('/admin');
	};

	return (
		<div className='admin-form-container'>
			<ClipLoader
				className='loader'
				color='orange'
				loading={loading}
				size={270}
				aria-label='Loading Spinner'
				data-testid='loader'
			/>
			<form className='admin-form' onSubmit={saveAndExit}>
				<div className='section admin-form-name'>
					<label htmlFor='name'>Nazwa</label>
					<input
						type='text'
						name='name'
						id='name'
						value={product.name}
						onChange={handleChange}
					/>
				</div>
				<div className='section admin-form-name'>
					<label htmlFor='name_en'>Name (English)</label>
					<input
						type='text'
						name='name_en'
						id='name_en'
						value={product.name_en}
						onChange={handleChange}
					/>
				</div>
				<div className='section admin-form-description'>
					<label htmlFor='description'> Opis</label>
					<textarea
						type='text'
						name='description'
						id='description'
						rows='8'
						cols='50'
						value={product.description}
						onChange={handleChange}></textarea>
				</div>
				<div className='section admin-form-description'>
					<label htmlFor='description_en'> Description (English)</label>
					<textarea
						type='text'
						name='description_en'
						id='description_en'
						rows='8'
						cols='50'
						value={product.description_en}
						onChange={handleChange}></textarea>
				</div>
				<section className='short-inputs'>
					<div className='short-input'>
						<label htmlFor='weiht'>Waga</label>
						<input
							type='number'
							min='0.5'
							max='100'
							step='0.5'
							name='weight'
							id='weight'
							value={product.weight}
							onChange={handleChange}
						/>
					</div>
					<div className='short-input'>
						<label htmlFor='persons'>Ilośc osób</label>
						<input
							type='number'
							min='1'
							max='100'
							step='1'
							name='persons'
							id='persons'
							value={product.persons}
							onChange={handleChange}
						/>
					</div>
					<div className='short-input'>
						<label htmlFor='category'> Kategoria</label>
						<select
							name='category'
							id='category'
							value={product.category}
							onChange={handleChange}>
							<option disabled defaultValue={true} value=''>
								Wybierz kategorię
							</option>
							{categories?.map(category => (
								<option value={category.value}>{category.label}</option>
							))}
						</select>
					</div>
					<div className='short-input'>
						<label htmlFor='subcategory'>Podkategoria</label>
						<select
							name='subcategory'
							id='subcategory'
							value={product.subcategory}
							onChange={handleChange}>
							<option defaultValue={true} disabled value=''>
								Wybierz subkategorię
							</option>
							<option value='A'>A</option>
							<option value='B'>B</option>
							<option value='C'>C</option>
						</select>
					</div>
				</section>
				<fieldset className='admin-form-ingredients'>
					<legend>Składniki</legend>
					<div className='ingred-list'>
						{ingredients.map(item => (
							<div className='ingredient'>
								<label htmlFor={item.value}>{item.label}</label>
								<input
									type='checkbox'
									id={item.value}
									checked={product.ingredients?.indexOf(item.value) > -1}
									name={'ingredients-' + item.value}
									onChange={handleChange}
								/>
							</div>
						))}
					</div>
				</fieldset>
				<fieldset>
					<legend>Aktualne zdjecia produktu</legend>
					<section className='add-img upload__image-wrapper'>
						{photos.map((photo, index) => {
							const uidValue = uid(4);
							return (
								<div key={index} className='image-item'>
									<img
										src={getUrlByFileName(photo.fileName)}
										width='100'
										alt='Cake'
									/>
									<div>
										<input
											type='radio'
											id={`main--${uidValue}`}
											name='main'
											checked={
												activeFoto?.type === 'from-server' &&
												activeFoto?.name === photo.fileName
											}
											onChange={() => {
												const config = {
													type: 'from-server',
													name: photo.fileName,
												};
												setActiveFoto(config);
											}}
										/>
										<label htmlFor='main'>Ustaw jako główne</label>
										<div>
											<ConfirmToast
												asModal={true}
												customCancel={'Nie usuwaj'}
												customConfirm={'Usuń'}
												message={'Czy na pewno chcesz usunąć zdjęcie'}
												theme={'dark'}
												showCloseIcon={false}
												customFunction={() => {
													deleteImageAndData(id, photo.fileName);
												}}>
												<p className='button'>Usuń</p>
											</ConfirmToast>
										</div>
									</div>
								</div>
							);
						})}
					</section>
				</fieldset>

				<fieldset>
					<legend>Dodaj zdjęcia</legend>
					<ImageUploading
						multiple
						value={images}
						onChange={onChange}
						maxNumber={10}
						dataURLKey='data_url'>
						{({
							imageList,
							onImageUpload,
							onImageRemoveAll,
							onImageUpdate,
							onImageRemove,
							isDragging,
							dragProps,
						}) => (
							// write your building UI
							<div className='upload__image-wrapper'>
								<section className='add-buttons'>
									<button
										className='button add-img-btn'
										style={isDragging ? { color: 'red' } : undefined}
										onClick={e => {
											e.preventDefault();
											onImageUpload(e);
										}}
										{...dragProps}>
										Dodaj zdjęcia lub przeciągnij je tutaj
									</button>

									<button
										disabled={images.length == 0}
										className={`button ${
											images.length === 0 ? 'invisible' : ''
										}`}
										onClick={e => {
											e.preventDefault();
											onImageRemoveAll(e);
										}}>
										Usuń wszystkie zdjecia
									</button>
								</section>
								<section className='add-img'>
									{imageList.map((image, index) => {
										const uidValue = uid(4);

										return (
											<div key={index} className='image-item'>
												<img src={image['data_url']} alt='' width='100' />
												<div className='image-item__btn-wrapper'>
													<input
														type='radio'
														id={`main-${uidValue}`}
														name='main'
														checked={
															activeFoto?.type === 'new' &&
															activeFoto?.name ===
																`${image.file.lastModified}-${image.file.name}`
														}
														onChange={() => {
															const config = {
																type: 'new',
																name: `${image.file.lastModified}-${image.file.name}`,
															};
															setActiveFoto(config);
														}}
													/>
													<label htmlFor={`main-${uidValue}`}>
														Ustaw jako główne
													</label>
													<button
														className='button'
														onClick={e => {
															e.preventDefault();
															onImageUpdate(index);
														}}>
														Zmień
													</button>
													<button
														className='button'
														onClick={e => {
															e.preventDefault();
															onImageRemove(index);
														}}>
														Usuń
													</button>
												</div>
											</div>
										);
									})}
								</section>
							</div>
						)}
					</ImageUploading>
				</fieldset>
				<div>
					<label htmlFor='state'>Pokaż produkt na stronie</label>
					<input
						type='checkbox'
						name='state'
						id='state'
						checked={product.state === 'active'}
						onChange={e => {
							const { checked } = e.target;
							e.target.value = checked ? 'active' : 'inactive';
							handleChange(e);
						}}
					/>
				</div>
				<Link to='/admin' className='button'>
					Wyjdź bez zapisywania
				</Link>

				<button className='button' onClick={saveAndStay}>
					Zapisz
				</button>
				<button type='submit' className='button'>
					Zapisz i wyjdź
				</button>
			</form>
			{/* <AdminIngredientsForm /> */}
		</div>
	);
};
