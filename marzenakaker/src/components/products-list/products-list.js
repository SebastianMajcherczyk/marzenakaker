import { useMemo, useState } from 'react';
import { ProductFilter } from '../product-filter/productFilter';
import Product from '../product/product';
import { getProductsByFilters } from './product-list.helpers';
import './products-list.css';
import { initialData } from '../../initial-data';

const ProductsList = () => {
	const [filterCriteria, setFilterCriteria] = useState({
		// weight: '',
		// persons: '',
		// category: '',
		// subcategory: {
		// 	small: false,
		// 	medium: false,
		// 	large: false
		// },
		persons: {
			type: 'VALUE',
			value: '',
		},
		weight: {
			type: 'VALUE',
			value: '',
		},
		subcategory: {
			type: 'CHOICE',
			value: [],
		},
		category: {
			type: 'CHOICE',
			value: [],
		},
	});
	const data = useMemo(
		() => getProductsByFilters(initialData, filterCriteria),
		[filterCriteria]
	);
	//const handleCheckbox = e => {
	//	console.log(e);
	//};

	const setValueToArray = (array, value) => {
		if (array.includes(value)) {
			return array.filter(val => val !== value);
		} else {
			return [...array, value];
		}
	};

	const removeFromArray = (array, value) => {
		return array.filter(val => val !== value);
	};

	const addToArray = (array, value) => {
		return [...new Set([...array, value])];
	};
	const handleChange = e => {
		console.log(e);
		
		const { value, name, tagName, checked } = e.target;
		//const tempState = {
		//	...filterCriteria,
		//	[name]: value,
		//	};
		
		const [filterName, filterValue] = name.split('-');
		const currentFilterType = filterCriteria[filterName].type;

		if (currentFilterType === 'VALUE') {
			const tempState = {
				...filterCriteria,
				[filterName]: { ...filterCriteria[filterName], value },
			};
			setFilterCriteria(tempState);
		} else if (currentFilterType === 'CHOICE') {
			if (tagName === 'SELECT') {
				///
			} else if (tagName === 'INPUT') {
				// To sa checkboxy - teoretycznie

				const tempState = {
					...filterCriteria,
					[filterName]: {
						...filterCriteria[filterName],
						value: checked
							? addToArray(filterCriteria[filterName].value, filterValue)
							: removeFromArray(filterCriteria[filterName].value, filterValue),
					},
				};
				setFilterCriteria(tempState);
			}
		}
	};

	const resetFilter = e => {
		e.preventDefault();
		setFilterCriteria({ weight: '', persons: '', category: '' });
	};
	return (
		<div className='products-wrapper'>
			<ProductFilter
				handleChange={handleChange}
				filterCriteria={filterCriteria}
				resetFilter={resetFilter}
			/>
			<div className='products-container'>
				{data.map(item => (
					<Product product={item} />
				))}
			</div>
		</div>
	);
};

export default ProductsList;
