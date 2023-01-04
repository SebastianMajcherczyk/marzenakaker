import React, { useContext, useState, useMemo } from 'react';
import { useEffect } from 'react';
import { AppContext } from '../../../ContextProvider';
import { productsService } from '../../../services/products.service';
import { useParams } from 'react-router-dom';
import './admin-product-form.css';
import { uid } from 'uid';

export const AdminProductForm = () => {
	const { categories } = useContext(AppContext);
	const [ingredientsDictionary, setIngredientsDictionary] = useState([]);
	const { id } = useParams();
	const isInEditMode = useMemo(() => id !== undefined, [id]);

	

	
	const [product, setProduct] = useState({
		name: '',
		name_en: '',
		description: '',
		descriprion_en: '',
		weight: '',
		persons: '',
		category: '',
		subcategory: '',
		ingredients: [],
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
				});
			})();
		}
	}, [isInEditMode]);
	

	const handleChange = e => {
		const { value, name, checked } = e.target;
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
	const onSubmit = e => {
		e.preventDefault();
		productsService.editProductById(id)
	};
	return (
		<div className='admin-form-container'>
			<form className='admin-form' onSubmit={onSubmit}>
				<div className='admin-form-name'>
					<label htmlFor='name'>Nazwa</label>
					<input
						type='text'
						name='name'
						id='name'
						value={product.name}
						onChange={handleChange}
					/>
				</div>
				<div className='admin-form-name'>
					<label htmlFor='name_en'>Name (English)</label>
					<input
						type='text'
						name='name_en'
						id='name_en'
						value={product.name_en}
						onChange={handleChange}
					/>
				</div>
				<div className='admin-form-description'>
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
				<div className='admin-form-description'>
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
				<div>
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
				<div>
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
						id='category'
						value={product.category}
						onChange={handleChange}>
						{categories?.map(category => (
							<option value={category.value}>{category.label}</option>
						))}
					</select>
				</div>
				<div className='admin-form-subcategory'>
					<label htmlFor='subcategory'>Podkategoria</label>
					<select
						id='subcategory'
						value={product.subcategory}
						onChange={handleChange}>
						<option value=''></option>
						<option value=''></option>
						<option value=''></option>
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

				<button type='submit'>Zapisz</button>
			</form>
		</div>
	);
};
