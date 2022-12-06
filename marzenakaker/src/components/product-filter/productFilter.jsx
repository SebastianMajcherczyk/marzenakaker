import React, { useState } from 'react';
import { FaChevronCircleUp, FaCheck } from 'react-icons/fa';
import './productFilter.css';
import { useTranslation } from 'react-i18next';
export const ProductFilter = ({
	handleChange,
	filterCriteria,
	resetFilter,
}) => {

	const { t } = useTranslation();
	const [filterHidden, setfilterHidden] = useState(null);
	const showHideFilter = e => {
		e.preventDefault();
		setfilterHidden(filterHidden ? null : 'hidden');
	};

	return (
		<div className='filter-container'>
			<button onClick={showHideFilter} className='hide-btn'>
				{' '}
				<FaChevronCircleUp className={`leftUp ${filterHidden}`} />
				{ filterHidden? t("SHOW_FILTER") : t("HIDE")}
				<FaChevronCircleUp className={`rightUp ${filterHidden}`} />{' '}
			</button>
			<form className={`filter ${filterHidden}`}>
				<div className='weight'>
					<label htmlFor='weight'>{t("CHOOSE_WEIGHT")} </label>
					<input
						type='number'
						id='weight'
						name='weight'
						min='1'
						max='5'
						value={filterCriteria.weight.value}
						onChange={handleChange}
					/>
				</div>
				<div className='persons'>
					<label htmlFor='persons'>{t("NUMBER_OF_PERSONS")} </label>
					<input
						type='number'
						id='persons'
						name='persons'
						min='3'
						max='15'
						value={filterCriteria.persons.value}
						onChange={handleChange}
					/>
				</div>

				<fieldset className='category'>
					<legend> {t("CHOOSE_CATEGORY")}</legend>
					<input
						type='checkbox'
						id='birthday'
						name='category-birthday'
						value='birthday'
						onChange={handleChange}
						checked={filterCriteria.category.value.includes('birthday')}
					/><FaCheck className='check'/>
					<label htmlFor='birthday'>Birthday</label>
					<input
						type='checkbox'
						id='wedding'
						name='category-wedding'
						value='wedding'
						onChange={handleChange}
						checked={filterCriteria.category.value.includes('wedding')}
					/>
					<label htmlFor='wedding'>Wedding</label>
					<input
						type='checkbox'
						id='sport'
						name='category-sport'
						value='sport'
						onChange={handleChange}
						checked={filterCriteria.category.value.includes('sport')}
					/>
					<label htmlFor='sport'>Sport</label>
				</fieldset>

				<fieldset className='subcategory'>
					<legend> {t("CHOOSE_SUBCATEGORY")}</legend>
					<input
						type='checkbox'
						id='small'
						name='subcategory-small'
						value='small'
						onChange={handleChange}
						checked={filterCriteria.subcategory.value.includes('small')}
					/>
					<label htmlFor='small'>Small</label>
					<input
						type='checkbox'
						id='medium'
						name='subcategory-medium'
						value='medium'
						onChange={handleChange}
						checked={filterCriteria.subcategory.value.includes('medium')}
					/>
					<label htmlFor='medium'>Medium</label>
					<input
						type='checkbox'
						id='large'
						name='subcategory-large'
						value='large'
						onChange={handleChange}
						checked={filterCriteria.subcategory.value.includes('large')}
					/>
					<label htmlFor='large'>Large</label>
				</fieldset>
				<button className='btn-reset' onClick={resetFilter}>
					{t("RESET")}
				</button>
			</form>
		</div>
	);
};
