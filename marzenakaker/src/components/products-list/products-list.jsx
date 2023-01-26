import { useContext, useMemo } from 'react';
import { ProductFilter } from '../product-filter/productFilter';
import Product from '../product/product';
import { getProductsByFilters } from './product-list.helpers';
import './products-list.css';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AppContext } from '../../ContextProvider';
import { useState } from 'react';
import { productsService } from '../../services/products.service';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../..';



const ProductsList = () => {
	const {
		setFilteredProductIds,
		filterCriteria,
		setFilterCriteria,
		ingredientsFilterMethod,
		setIngredientsFilterMethod,
		sortingCriteria,
		setSortingCriteria
	} = useContext(AppContext);

	const navigate = useNavigate();
	const [products, setProducts] = useState([]);
	
	const { data, productIds } = useMemo(() => {
		const filteredProducts = getProductsByFilters(products, filterCriteria, {
			ingredientsFilterMethod,
		});
		const ids = filteredProducts.map(({ id }) => id);
		return { data: filteredProducts, productIds: ids };
	}, [filterCriteria, products, ingredientsFilterMethod]);

	// useEffect(() => {
	// 	(async () => {

	// 		const data = await productsService.getProducts();
	// 		setProducts(data);
	// 	})();
	// }, []);
	const sortedProducts = useMemo(() => {
		const sorted = [...data].sort((a, b) => {
			if (sortingCriteria.method === 'asc')
				return (
					a[sortingCriteria.sortingValue] - b[sortingCriteria.sortingValue]
				);
			else if (sortingCriteria.method === 'desc') {
				return (
					b[sortingCriteria.sortingValue] - a[sortingCriteria.sortingValue]
				);
			}
		});
		return sorted
	}, [data, sortingCriteria]);

	useEffect(() => {
		(async () => {
		const data = await  productsService.getProducts()
		setProducts(data);
		})()
	}, []);

	useEffect(() => {
		setFilteredProductIds?.(productIds);
	}, [productIds, setFilteredProductIds]);

	const removeFromArray = (array, value) => {
		return array.filter(val => val !== value);
	};

	const addToArray = (array, value) => {
		return [...new Set([...array, value])];
	};
	const handleChange = (e, filterCriteriaChanged) => {
		//debugger
		const { value, name, checked } = e.target;

		const filterCriteriaVal = filterCriteriaChanged || filterCriteria;

		const [filterName, filterValue] = name.split('-');
		const currentFilterType = filterCriteriaVal[filterName].type;

		let tempState = {};
		if (
			currentFilterType === 'CHOICE' ||
			currentFilterType === 'CHOICE_FROM_ARRAY'
		) {
			tempState = {
				...filterCriteriaVal,
				[filterName]: {
					...filterCriteriaVal[filterName],
					value: checked
						? addToArray(filterCriteriaVal[filterName].value, filterValue)
						: removeFromArray(filterCriteriaVal[filterName].value, filterValue),
				},
			};
			setFilterCriteria(tempState);
			//}
		} else {
			tempState = {
				...filterCriteriaVal,
				[filterName]: { ...filterCriteriaVal[filterName], value },
			};
			setFilterCriteria(tempState);
		}

		return tempState;
		// else if (currentFilterType === 'CHOICE') {
		// 	//if (tagName === 'SELECT') {
		// 	///
		// 	//	} else if (tagName === 'INPUT') {
		// 	// To sa checkboxy - teoretycznie

		// 	const tempState = {
		// 		...filterCriteria,
		// 		[filterName]: {
		// 			...filterCriteria[filterName],
		// 			value: checked
		// 				? addToArray(filterCriteria[filterName].value, filterValue)
		// 				: removeFromArray(filterCriteria[filterName].value, filterValue),
		// 		},
		// 	};
		// 	setFilterCriteria(tempState);
		// 	//}
		// }
	};
	return (
		<div className='products-wrapper'>
			<ProductFilter
				handleChange={handleChange}
				filterCriteria={filterCriteria}
				setFilterCriteria={setFilterCriteria}
				setIngredientsFilterMethod={setIngredientsFilterMethod}
				ingredientsFilterMethod={ingredientsFilterMethod}
				sortingCriteria={sortingCriteria}
				setSortingCriteria={setSortingCriteria}
			/>
			<div className='products-container'>
				{sortedProducts.map(item => (
					<div
						key={item.id}
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
