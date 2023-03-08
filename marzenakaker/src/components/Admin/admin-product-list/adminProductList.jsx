import React, { useContext } from 'react';
import { productsService } from '../../../services/products.service';
import { AdminProductRow } from './admin-product-row/adminProductRow';
import { Link } from 'react-router-dom';
import './adminProductList.css';
import { AdminIngredientsForm } from '../admin-ingredients-form/adminIngredientsForm';
import { AdminContext } from '../../../ContextProvider';
export const AdminProductList = () => {
	const { products, getProducts } = useContext(AdminContext);

	const onDelete = async id => {
		await productsService.deleteProductAndConnectedPhotosById(id);
		await getProducts();
	};

	return (
		<div className='admin-list-container'>
			<Link to='/admin/product/add' className='button add-btn'>
				Dodaj nowy produkt
			</Link>
			<AdminIngredientsForm />
			<table className='product-table table' width='100%'>
				<thead>
					<tr>
						<th width='5%'>ID</th>
						<th width='15%'>Nazwa</th>
						<th>Opis</th>
						<th>Zdj</th>
						<th>Akcje</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product, index) => (
						<AdminProductRow
							key={index}
							product={product}
							onDelete={onDelete}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};
