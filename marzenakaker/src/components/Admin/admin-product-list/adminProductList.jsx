import React, { useState, useEffect } from 'react';
import { productsService } from '../../../services/products.service';
import { AdminProductRow } from './admin-product-row/adminProductRow';
import { Link } from 'react-router-dom';
import './adminProductList.css';
export const AdminProductList = () => {
	const [products, setProducts] = useState([]);
	const getProducts = async () => {
		const data = await productsService.getProducts();
		setProducts(data);
	};
	const onDelete = async id => {
		await productsService.deleteProductById(id);
		await getProducts();
	};
	useEffect(() => {
		getProducts();
	}, []);

	return (
		<div className='admin-prodlist-container'>
			<Link to='/admin/product/add' className='button add-btn'>
				Dodaj nowy produkt
			</Link>
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
						<AdminProductRow product={product} onDelete={onDelete} />
					))}
				</tbody>
			</table>
		</div>
	);
};
