import React, { useContext, useState, useMemo } from 'react';
import { useEffect } from 'react';
import { AppContext } from '../../../ContextProvider';
import { productsService } from '../../../services/products.service';
import { useParams, useNavigate } from 'react-router-dom';
import './admin-product-form.css';
import { Link } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';

export const AdminProductForm = () => {
	const [images, setImages] = useState([]);
	const onChange = (imageList, addUpdateIndex) => {
		// data for submit
		console.log(imageList, addUpdateIndex);
		setImages(imageList);
	};

	const { categories } = useContext(AppContext);
	const [ingredientsDictionary, setIngredientsDictionary] = useState([]);
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
		state: '',
	});
	useEffect(() => {
		(async () => {
			const data = await productsService.getIngredientsDictionary();
			setIngredientsDictionary(data);
		})();
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
		console.log(e.target);
		let tempState = {};
		//To jest czeckbox
		if (name?.includes('-')) {
			// debugger
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
			await productsService.editProductById(id);
		} else {
			await productsService.addProduct(product);
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
						rows='10'
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
						rows='10'
						cols='50'
						value={product.description_en}
						onChange={handleChange}></textarea>
				</div>
				<div className='admin-form-weight'>
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
				<div className='admin-form-persons'>
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
				<div className='admin-form-category'>
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
				<div className='admin-form-subcategory'>
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

				<fieldset className='admin-form-ingredients'>
					<legend>Składniki</legend>
					{ingredientsDictionary.map(item => (
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
				<div>
					<label htmlFor='state'>Pokaż na stronie</label>
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
							<button
								style={isDragging ? { color: 'red' } : undefined}
								onClick={e => {
									e.preventDefault();
									onImageUpload(e);
								}}
								{...dragProps}>
								Click or Drop here
							</button>
							&nbsp;
							<button
								onClick={e => {
									e.preventDefault();
									onImageRemoveAll(e);
								}}>
								Remove all images
							</button>
							{imageList.map((image, index) => (
								<div key={index} className='image-item'>
									<img src={image['data_url']} alt='' width='100' />
									<div className='image-item__btn-wrapper'>
										<button
											onClick={e => {
												e.preventDefault();
												onImageUpdate(index);
											}}>
											Update
										</button>
										<button
											onClick={e => {
												e.preventDefault();
												onImageRemove(index);
											}}>
											Remove
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				</ImageUploading>

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
