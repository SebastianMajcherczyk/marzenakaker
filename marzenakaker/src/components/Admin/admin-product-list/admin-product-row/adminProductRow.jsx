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
				<Link className='button'
					onClick={() => setIdToEdit(product.id)}>Edytuj
					to={'product/edit/' + product.id}
					
				</Link>
				<button className='button btn-delete' onClick={deleteProduct}>
					Usuń
				</button>
			</td>
		</tr>
	);
};
