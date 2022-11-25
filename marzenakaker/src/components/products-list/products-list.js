import { useContext, useMemo } from 'react';
import { ProductFilter } from '../product-filter/productFilter';
import Product from '../product/product';
import { getProductsByFilters } from './product-list.helpers';
import './products-list.css';
import { initialData } from '../../initial-data';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AppContext } from '../../ContextProvider';

const ProductsList = ({ filterCriteria, setFilterCriteria, resetFilter }) => {
	const { setFilteredProductIds } = useContext(AppContext);
	const navigate = useNavigate();

	const { data, productIds } = useMemo(() => {
		const products = getProductsByFilters(initialData, filterCriteria);
		const ids = products.map(({ id }) => id);
		return { data: products, productIds: ids };
	}, [filterCriteria]);

	useEffect(() => {
		setFilteredProductIds?.(productIds);
	}, [productIds, setFilteredProductIds]);

	const removeFromArray = (array, value) => {
		return array.filter(val => val !== value);
	};

	const addToArray = (array, value) => {
		return [...new Set([...array, value])];
	};
	const handleChange = e => {

		const { value, name, tagName, checked } = e.target;

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

	return (
		<div className='products-wrapper'>
			<ProductFilter
				handleChange={handleChange}
				filterCriteria={filterCriteria}
				resetFilter={resetFilter}
			/>
			<div className='products-container'>
				{data.map(item => (
					<div
						onClick={() => {
							navigate(`/products/${item.id}`);
						}}>
						<Product product={item} />
					</div>
				))}
			</div>
		</div>
	);
};

export default ProductsList;
