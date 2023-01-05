import React, { useState, useEffect, useContext } from 'react';
import { FaChevronCircleUp} from 'react-icons/fa';
import './productFilter.css';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../ContextProvider';
import { productsService } from '../../services/products.service';

export const ProductFilter = ({
	handleChange,
	filterCriteria,
	setFilterCriteria,
	ingredientsFilterMethod,
	setIngredientsFilterMethod
}) => {
	const {filterCriteriaDef} = useContext(AppContext)
	const [ingredientsDictionary, setIngredientsDictionary] = useState([]);
	const { t , i18n} = useTranslation();
	const [filterHidden, setfilterHidden] = useState(null);
	const showHideFilter = e => {
		e.preventDefault();
		setfilterHidden(filterHidden ? null : 'hidden');
	};
	const resetFilter = e => {
		e.preventDefault();
		setFilterCriteria(filterCriteriaDef.filterCriteriaValue);
	};
	useEffect(() => {
		(async () => {
			const data = await productsService.getIngredientsDictionary();
			setIngredientsDictionary(data);
			
		})();
	});

	const getTranslatedLabel = (key, defaultValue) => i18n.exists(key) ? t(key) : defaultValue

	console.log(ingredientsDictionary);
	return (
		<div className='filter-container'>
			<button onClick={showHideFilter} className='hide-btn'>
				{' '}
				<FaChevronCircleUp className={`leftUp ${filterHidden}`} />
				{filterHidden ? t('SHOW_FILTER') : t('HIDE')}
				<FaChevronCircleUp className={`rightUp ${filterHidden}`} />{' '}
			</button>
			<form className={`filter ${filterHidden}`}>
				<div className='weight'>
					<label htmlFor='weight'>{t('CHOOSE_WEIGHT')} </label>
					<input
						placeholder='od..'
						type='number'
						id='weight'
						name='weight'
						min='0.5'
						max='5'
						step='0.5'
						value={filterCriteria.weight.value}
						onChange={handleChange}
					/>
					<input
						placeholder='...do'
						type='number'
						id='weight_max'
						name='weight_max'
						min='1'
						max='5'
						value={filterCriteria.weight_max.value}
						onChange={handleChange}
					/>{' '}
					kg
				</div>
				<div className='persons'>
					<label htmlFor='persons'>{t('NUMBER_OF_PERSONS')} </label>
					<input
						placeholder='od...'
						type='number'
						id='persons'
						name='persons'
						min='3'
						max='15'
						value={filterCriteria.persons.value}
						onChange={handleChange}
					/>
					<input
						placeholder='...do'
						type='number'
						id='persons_max'
						name='persons_max'
						min='3'
						max='15'
						value={filterCriteria.persons_max.value}
						onChange={handleChange}
					/>
					{t('PERSONS')}
				</div>

				<fieldset className='category'>
					<legend> {t('CHOOSE_CATEGORY')}</legend>
					<div>
					<label htmlFor='birthday'>{t('BIRTHDAY')}</label>
						<input
							type='checkbox'
							id='birthday'
							name='category-birthday'
							value='birthday'
							onChange={handleChange}
							checked={filterCriteria.category.value.includes('birthday')}
						/>
						
					
					</div>
					<div>
					<label htmlFor='wedding'>{t('WEDDING')}</label>
						<input
							type='checkbox'
							id='wedding'
							name='category-wedding'
							value='wedding'
							onChange={handleChange}
							checked={filterCriteria.category.value.includes('wedding')}
						/>
						
					</div>
					<div>
						<label htmlFor='other'>{t('OTHER')}</label>	
						<input
							type='checkbox'
							id='other'
							name='category-other'
							value='other'
							onChange={handleChange}
							checked={filterCriteria.category.value.includes('other')}
						/>
					</div>
				</fieldset>

				{/* <fieldset className='subcategory'>
					<legend> {t('CHOOSE_SUBCATEGORY')}</legend>
					<div>
						<input
							type='checkbox'
							id='small'
							name='subcategory-small'
							value='small'
							onChange={handleChange}
							checked={filterCriteria.subcategory.value.includes('small')}
						/>
						<label htmlFor='small'>Small</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='medium'
							name='subcategory-medium'
							value='medium'
							onChange={handleChange}
							checked={filterCriteria.subcategory.value.includes('medium')}
						/>
						<label htmlFor='medium'>Medium</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='large'
							name='subcategory-large'
							value='large'
							onChange={handleChange}
							checked={filterCriteria.subcategory.value.includes('large')}
						/>
						<label htmlFor='large'>Large</label>
					</div>
				</fieldset> */}
				<fieldset className='ingredients'>
					<legend>{t('CHOOSE INGREDIENTS')}</legend>
					{ingredientsDictionary.map(item => (
						<div key={item.id}>
							<label htmlFor={item.value}>
								{getTranslatedLabel(item.translationKey, item.label)}
							</label>
							<input
								type='checkbox'
								id={item.value}
								checked={filterCriteria?.ingredients.value.includes(item.value)}
								name={'ingredients-' + item.value}
								onChange={handleChange}
							/>
						</div>
					))}
					<fieldset>
						<legend>{t('CHOOSE_FILTER_METHOD')}</legend>
						<label htmlFor='OR'>{t('OR')}</label>
						<input
							type='radio'
							id='OR'
							value='OR'
							name='filter_ingredients'
							checked={ingredientsFilterMethod === 'OR'}
							onChange={() => setIngredientsFilterMethod('OR')}
						/>
						<label htmlFor='AND'>{t('AND')}</label>
						<input
							type='radio'
							id='AND'
							value='AND'
							name='filter_ingredients'
							checked={ingredientsFilterMethod === 'AND'}
							onChange={() => setIngredientsFilterMethod('AND')}

						/>
					</fieldset>
				</fieldset>
				<button className='btn-reset' onClick={resetFilter}>
					{t('RESET')}
				</button>
			</form>
		</div>
	);
};
