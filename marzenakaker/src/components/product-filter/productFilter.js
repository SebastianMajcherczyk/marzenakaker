import React from 'react';

import './productFilter.css';

export const ProductFilter = ({
	handleChange,
	filterCriteria,
	resetFilter,
	
}) => {
	const handleFilter = () => {};
	return (
		<div className='filter-container'>
			<form className='filter'>
				<div className='weight'>
					<label htmlFor='weight'>Choose the weight: </label>
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
					<label htmlFor='persons'>No of persons: </label>
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

				{/* <fieldset className='category'>
					<legend> Choose the category</legend>
					<input
						type='checkbox'
						id='birthday'
						name='category-birthday'
						value='birthday'
						onChange={handleChange}
					/>
					<label htmlFor='small'>Birthday</label>
					<input
						type='checkbox'
						id='wedding'
						name='category-wedding'
						value='wedding'
						onChange={handleChange}
					/>
					<label htmlFor='medium'>Wedding</label>
					<input
						type='checkbox'
						id='sport'
						name='category-sport'
						value='sport'
						onChange={handleChange}
					/>
					<label htmlFor='large'>Sport</label>
				</fieldset> */}
				

				<fieldset className='subcategory'>
					<legend> Choose the subcategory</legend>
					<input
						type='checkbox'
						id='small'
						name='subcategory-small'
						value='small'
						onChange={handleChange}
					/>
					<label htmlFor='small'>Small</label>
					<input
						type='checkbox'
						id='medium'
						name='subcategory-medium'
						value='medium'
						onChange={handleChange}
					/>
					<label htmlFor='medium'>Medium</label>
					<input
						type='checkbox'
						id='large'
						name='subcategory-large'
						value='large'
						onChange={handleChange}
					/>
					<label htmlFor='large'>Large</label>
				</fieldset>
				<button className='btn-reset' onClick={resetFilter}>
					Reset filter
				</button>
			</form>
		</div>
	);
};
