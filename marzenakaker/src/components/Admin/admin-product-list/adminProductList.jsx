import React, { useState, useEffect } from 'react';
import { productsService } from '../../../services/products.service';
import { AdminProductRow } from './admin-product-row/adminProductRow';
import './adminProductList.css';
export const AdminProductList = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		(async () => {
			const data = await productsService.getProducts();
			setProducts(data);
		})();
	}, []);

	return (
		
			<table className='product-table'>
				<thead>
					<tr>
						<th>ID</th>
						<th>Nazwa</th>
						<th>Opis</th>
						<th>Akcje</th>
					</tr>
				</thead>
				<tbody>
					{products.map(product => (
						<AdminProductRow product={product} />
					))}
				</tbody>
			</table>
		
	);
};
