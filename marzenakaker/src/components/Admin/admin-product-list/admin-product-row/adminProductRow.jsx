import React from 'react';

export const AdminProductRow = ({ product }) => {
	return (
		<tr >
			<td >{product.id}</td>
			<td>{product.name}</td>
			<td>{product.description}</td>
			<td className='actions'>
				<button className='button btn-edit'>Edytuj</button>
				<button className='button btn-delete'>Usuń</button>
			</td>
		</tr>
	);
};
