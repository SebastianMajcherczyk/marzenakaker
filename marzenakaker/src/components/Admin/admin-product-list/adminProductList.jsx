import React, { useContext } from 'react';
import { productsService } from '../../../services/products.service';
import { AdminProductRow } from './admin-product-row/adminProductRow';
import { Link } from 'react-router-dom';
import './adminProductList.css';
import { AdminIngredientsForm } from '../admin-ingredients-form/adminIngredientsForm';
import { AdminContext, AppContext } from '../../../ContextProvider';
import { useMemo, useState } from 'react';
import { BsChevronExpand } from 'react-icons/bs';
import { TablePagination } from '@mui/material';



export const AdminProductList = () => {
	const { language } = useContext(AppContext);
	const { products, getProducts } = useContext(AdminContext);
	const [sortingConfig, setSortingConfig] = useState({
		column: null,
		order: null,
		type: null /*text || date*/,
	});
	
	//Pagination start//
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	//Pagination end//

	const onDelete = async id => {
		await productsService.deleteProductAndConnectedPhotosById(id);
		await getProducts();
	};
	const sortedProducts = useMemo(() => {
		if (!sortingConfig.column) {
			return products;
		}

		const productsCopy = [...products];
		const sortingOrderTuple = sortingConfig.order === 'asc' ? [-1, 1] : [1, -1];
		const [orderA, orderB] = sortingOrderTuple;
		return productsCopy.sort((a, b) => {
			if (sortingConfig.type === 'text') {
				return a[sortingConfig.column][language] <
					b[sortingConfig.column][language]
					? orderA
					: orderB;
			}

			if (sortingConfig.type === 'date') {
				return a[sortingConfig.column].seconds < b[sortingConfig.column].seconds
					? orderA
					: orderB;
			}
		});
	}, [products, sortingConfig]);

	const productsOnPage = useMemo(() => {
		return sortedProducts.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
	}, [page, rowsPerPage, sortedProducts]);
	
	const changeSortingOrder = newSortingConfig => {
		const isSameColumn = newSortingConfig.column === sortingConfig.column;

		if (isSameColumn) {
			if (sortingConfig.order === 'asc') {
				setSortingConfig({
					column: newSortingConfig.column,
					order: 'desc',
					type: newSortingConfig.type,
				});
			} else if (sortingConfig.order === 'desc') {
				setSortingConfig({ column: null, order: null, type: null });
			} else {
				setSortingConfig({
					column: newSortingConfig.column,
					order: 'asc',
					type: newSortingConfig.type,
				});
			}
		} else {
			setSortingConfig({
				column: newSortingConfig.column,
				order: 'asc',
				type: newSortingConfig.type,
			});
		}
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
						<th
							className='sorting-header'
							width='5%'
							onClick={() =>
								changeSortingOrder({ column: 'createdAt', type: 'date' })
							}>
							Data <BsChevronExpand />
						</th>
						<th
							className='sorting-header'
							width='15%'
							onClick={() =>
								changeSortingOrder({ column: 'name', type: 'text' })
							}>
							Nazwa <BsChevronExpand />
						</th>
						<th
							className='sorting-header'
							onClick={() =>
								changeSortingOrder({ column: 'description', type: 'text' })
							}>
							Opis <BsChevronExpand />
						</th>
						<th>Zdjęcie</th>
						<th>Akcje</th>
					</tr>
				</thead>
				<tbody>
					{productsOnPage.map((product, index) => (
						<AdminProductRow
							key={index}
							product={product}
							onDelete={onDelete}
						/>
					))}
				</tbody>
			</table>
			<TablePagination
				component='div'
				count={sortedProducts.length}
				page={page}
				labelRowsPerPage={'Wierszy na stronie:'}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</div>
	);
};
