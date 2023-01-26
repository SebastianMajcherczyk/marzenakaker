import React, { useContext, useState, useMemo } from 'react';
import { useEffect } from 'react';
import { AppContext } from '../../../ContextProvider';
import { productsService } from '../../../services/products.service';
import { useParams, useNavigate } from 'react-router-dom';
import './admin-product-form.css';
import { Link } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';
import { uid } from 'uid';
import { storageService } from '../../../services/storage.service';

export const AdminProductForm = () => {
	const [images, setImages] = useState([]);
	const onChange = (imageList, addUpdateIndex) => {
		// data for submit
		console.log(imageList, addUpdateIndex);
		setImages(imageList);
	};

	const { categories, ingredients } = useContext(AppContext);

	const { id } = useParams();
	const navigate = useNavigate();
	const isInEditMode = useMemo(() => id !== undefined, [id]);

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

	useEffect(() => {
		if (isInEditMode) {
			(async () => {
				const data = await productsService.getProductById(id);
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
				});
			})();
		}
	}, [isInEditMode, id]);

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
	const onSubmit = async e => {
		e.preventDefault();
		if (isInEditMode) {
			await productsService.editProductById(id, product);
		} else {
			const productId = uid();
			const productClone = {...product, id: productId, photos: []}
			
			for await (const imageData of images){
				const {file} = imageData;
				const id = uid();
				const type = file.name.split('.').pop();
				const photoId = `${id}.${type}`
				const path = `${productId}/${photoId}`;
				await storageService.addImage(path, file)
				productClone.photos.push({
					fileName: photoId,
					name: 'Test',
					type: images.indexOf(imageData) === 0 ? 'main' : 'standard'
				})
			}
			await productsService.addProduct(productClone);
		}
		navigate('/admin');
	};
	return (
		<div className='admin-form-container'>
			<form className='admin-form' onSubmit={onSubmit}>
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
							max='15'
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
							max='15'
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
					{ingredients.map(item => (
						<div>
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
										className={`button ${images.length == 0 ? 'invisible' : ''}`}
										onClick={e => {
											e.preventDefault();
											onImageRemoveAll(e);
										}}>
										Usuń wszystkie zdjecia
									</button>
								</section>
								<section className='add-img'>
									{imageList.map((image, index) => (
										<div key={index} className='image-item'>
											<img src={image['data_url']} alt='' width='100' />
											<div className='image-item__btn-wrapper'>
												<button
													className='button'
													onClick={e => {
														e.preventDefault();
														onImageUpdate(index);
													}}>
													Zaktualizuj
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
									))}
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
					Wróć bez zapisywania
				</Link>

				<button type='submit' className='button'>
					Zapisz
				</button>
			</form>
		</div>
	);
};
