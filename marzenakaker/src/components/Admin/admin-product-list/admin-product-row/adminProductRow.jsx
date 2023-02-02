import React, { useContext } from 'react';
import { AppContext } from '../../../../ContextProvider';
import { Link } from 'react-router-dom';
import { ConfirmToast } from 'react-confirm-toast';
import './adminProductRow.css'
export const AdminProductRow = ({ product, onDelete }) => {
	// const { setIdToEdit } = useContext(AppContext);
	const deleteProduct = async () => {
		await onDelete(product.id);
	};

	return (
		<tr>
			<td>{product.id}</td>
			<td>{product.name.pl}</td>
			<td>{product.description.pl}</td>
			<td className='actions'>
				<Link
					className='button'
					// onClick={() => setIdToEdit(product.id)}
					to={'product/edit/' + product.id}>
					Edytuj
				</Link>
				<ConfirmToast 
					asModal={true}
					customCancel={'Nie usuwaj'}
					customConfirm={'Usuń'}
					message={'Czy na pewno chcesz usunąć produkt'}
					theme={'dark'}
					customFunction={deleteProduct}
					
				>
					<button className='button btn-delete' >
						Usuń
					</button>
				</ConfirmToast>
			</td>
		</tr>
	);
};
