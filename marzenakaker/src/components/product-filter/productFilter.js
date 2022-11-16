import React from 'react';

import './productFilter.css';

export const ProductFilter = ({
	handleChange,
	filterCriteria,
	resetFilter,
    handleSelect
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
						value={filterCriteria.weight}
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
						value={filterCriteria.persons}
						onChange={handleChange}
					/>
				</div>
				<div className='category'>
                    <select multiple 
                    name='category'
                    onChange={handleChange}>
                        <option>Birthday</option>
                        <option>Wedding</option>
                        <option>Sport</option>
                    </select>

               
                </div>
				<button onClick={resetFilter}>Reset filter</button>
			</form>
		</div>
	);
};
