import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../../../ContextProvider';
import { Link } from 'react-router-dom';
import { ConfirmToast } from 'react-confirm-toast';
import './adminProductRow.css';
import { storageService } from '../../../../services/storage.service';
export const AdminProductRow = ({ product, onDelete }) => {
	const [url, setUrl] = useState(undefined);
	const mainPhoto =
		product.photos.find(element => element.type === 'main') ||
		product.photos.find(element => element.type === 'standard');
	const serverFilePath = `${product.id}/${mainPhoto?.fileName}`;

	useEffect(() => {
		(async () => {
			if (serverFilePath) {
				const link = await storageService.getImageById(serverFilePath);
				setUrl(link);
			}
		})();
	}, [product]);

	const deleteProduct = async () => {
		await onDelete(product.id);
	};
const convertToDate = (time) => {
	const fireBaseTime = new Date(time.seconds * 1000 + time.nanoseconds / 1000000)
	const date = fireBaseTime.toLocaleDateString()
	return date
}
	return (
		<tr className='row'>
			<td>{product.id}</td>
			<td>{convertToDate(product.createdAt)}</td>
			<td>{product.name.pl}</td>
			<td className='description'>{product.description.pl}</td>
			<td>
				<div className='table-items'>
					{mainPhoto && (
						<img src={url} alt={mainPhoto.name} className='table-img' />
					)}{' '}
				</div>
			</td>
			<td>
				<div className='table-items'>
					<Link className='button' to={'product/edit/' + product.id}>
						Edytuj
					</Link>
					<ConfirmToast
						asModal={true}
						customCancel={'Nie usuwaj'}
						customConfirm={'Usuń'}
						message={'Czy na pewno chcesz usunąć produkt?'}
						theme={'dark'}
						showCloseIcon={false}
						customFunction={deleteProduct}>
						<button className='button btn-delete'>Usuń</button>
					</ConfirmToast>
				</div>
			</td>
		</tr>
	);
};
