import React, { useContext } from 'react';
import { AppContext } from '../../../../ContextProvider';
import { Link } from 'react-router-dom';

export const AdminProductRow = ({ product, onDelete }) => {
	const { setIdToEdit } = useContext(AppContext);
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
					to={'product/edit/' + product.id}
					onClick={() => setIdToEdit(product.id)}>
					<button className='button btn-edit'>Edytuj</button>
				</Link>
				<button className='button btn-delete' onClick={deleteProduct}>
					Usuń
				</button>
			</td>
		</tr>
	);
};
