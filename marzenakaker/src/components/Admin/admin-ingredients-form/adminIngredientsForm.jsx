import React, { useState, useContext, useMemo } from 'react';
import './adminIngredientsForm.css';
import { productsService } from '../../../services/products.service';
import ClipLoader from 'react-spinners/ClipLoader';
import { AdminContext, AppContext } from '../../../ContextProvider';
import { Modal } from 'react-responsive-modal';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const AdminIngredientsForm = () => {
	const [modalOpen, setModalOpen] = useState(false);

	const onOpenModal = () => setModalOpen(true);
	const onCloseModal = () => setModalOpen(false);
	const [modalContent, setModalContent] = useState({});

	const [newIngredient, setNewIngredient] = useState({
		label: '',
		value: '',
		firestoreId: '',
	});
	const { ingredients, setIngredients } = useContext(AppContext);
	const { products, getProducts } = useContext(AdminContext);
	const [addIngerientActive, setAddIngredientActive] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleChange = e => {
		const { value, name } = e.target;
		let tempState = {};
		tempState = { ...newIngredient, [name]: value };
		setNewIngredient({ ...tempState });
	};
	const localIngredients = useMemo(() => ingredients, [ingredients]);
	// const checkIngredientDuplicates = ingredient => {
	// 	if (localIngredients.some(item => item.label.toLowerCase() === ingredient.label.toLowerCase())) {
	// 		setModalContent({
	// 			h2: `Istnieje już składnik o takiej samej polskiej nazwie`,
	// 			list: '',
	// 		});
	// 		onOpenModal();
	// 		return true;
	// 	}
	// };
	const onSubmit = async e => {
		e.preventDefault();
		if (newIngredient.firestoreId) {
			if (newIngredient.label !== '' && newIngredient.value !== '') {
				setLoading(true);
				const data = {
					label: newIngredient.label,
					value: newIngredient.value,
				};
				await productsService.editIngredientById(
					newIngredient.firestoreId,
					data
				);
				setNewIngredient({ label: '', value: '' });

				// setAddIngredientActive(false);
				setLoading(false);
			}
			const data = await productsService.getIngredientsDictionary();
			setIngredients(data);
		} else if (newIngredient.label !== '' && newIngredient.value !== '') {
			if (
				localIngredients.some(
					item =>
						item.label.toLowerCase() === newIngredient.label.toLocaleLowerCase()
				)
			) {
				setModalContent({
					h2: `Istnieje już składnik o takiej samej polskiej nazwie`,
				});
				onOpenModal();
				return;
			} else if (
				localIngredients.some(
					item =>
						item.value.toLowerCase() === newIngredient.value.toLocaleLowerCase()
				)
			) {
				setModalContent({
					h2: `Istnieje już składnik o takiej samej angielskiej nazwie`,
				});
				onOpenModal();
				return;
			} else {
				setLoading(true);
				await productsService.addIngredient(newIngredient);
				setNewIngredient({ label: '', value: '' });
				// setAddIngredientActive(false);
				setLoading(false);
			}
		}
		const data = await productsService.getIngredientsDictionary();
		setIngredients(data);
		getProducts();
	};
	const editItem = ingredientId => {
		const ingredientChecked = checkIngredientInProducts(ingredientId);
		if (ingredientChecked.length !== 0) {
			const listToRemove = ingredientChecked.map(item => (
				<li>{item.name.pl}</li>
			));

			setModalContent({
				h2: `Nie możesz edytować tego składnika ponieważ został on użyty w produktach. Przed edycją tego składnika usuń go najpierw z następujących produktów:`,
				list: listToRemove,
			});
			onOpenModal();
		} else {
			const ingredientToEdit = ingredients.filter(
				item => item.firestoreId === ingredientId
			);
			setNewIngredient({
				label: ingredientToEdit[0].label,
				value: ingredientToEdit[0].value,
				firestoreId: ingredientToEdit[0].firestoreId,
			});
		}
	};

	const deleteAlert = {
		id: '',
		title: 'Czy na pewno chcesz usunąc ten składnik',
		buttons: [
			{
				label: 'Usuń',
				onClick: async () => {
					setLoading(true);
					await productsService.deleteIngredient(deleteAlert.id);
					const data = await productsService.getIngredientsDictionary();
					setIngredients(data);
					setLoading(false);
					setNewIngredient({
						label: '',
						value: '',
						firestoreId: '',
					});
				},
			},
			{
				label: 'Nie usuwaj',
				onClick: () => {
					return;
				},
			},
		],
		closeOnEscape: true,
		closeOnClickOutside: true,
		overlayClassName: 'confirm',
	};
	const checkIngredientInProducts = id => {
		//finding actually clicked ingredient
		const currentIngredient = ingredients.find(item => item.firestoreId === id);

		// creating the list of products containig clicked ingredient
		const productsWithIngredient = products.filter(product =>
			product.ingredients.some(
				ingredient => ingredient === currentIngredient.value
			)
		);
		return productsWithIngredient;
	};

	const deleteItem = async ingredientId => {
		const ingredientChecked = checkIngredientInProducts(ingredientId);

		if (ingredientChecked.length !== 0) {
			const listToRemove = ingredientChecked.map(item => (
				<li>{item.name.pl}</li>
			));
			onOpenModal();
			setModalContent({
				h2: `Nie możesz usunąć tego składnika ponieważ został on użyty w produktach. Przed usunięciem tego składnika usuń go najpierw z następujących produktów:`,
				list: listToRemove,
			});
		} else {
			deleteAlert.id = ingredientId;
			confirmAlert(deleteAlert);
		}
	};
	return (
		<div className={`ingredients-form-container ${loading ? loading : ''}`}>
			<ClipLoader
				className='loader'
				color='orange'
				loading={loading}
				size={270}
				aria-label='Loading Spinner'
				data-testid='loader'
			/>

			<button
				type='button'
				className='button'
				onClick={() => setAddIngredientActive(!addIngerientActive)}>
				{`${
					addIngerientActive
						? 'Zamknij edytor składników'
						: 'Edytuj listę składników'
				}`}
			</button>
			<div
				className={`addIngredForm ${
					addIngerientActive ? 'open-ingredients' : ''
				} `}>
				<form onSubmit={onSubmit}>
					<p> Dodaj nowy składnik: </p>
					<div className='section'>
						<label htmlFor='label'> Wpisz nazwę składnika po polsku:</label>
						<input
							type='text'
							id='label'
							name='label'
							value={newIngredient.label}
							onChange={handleChange}
						/>
					</div>
					<div className='section'>
						<label htmlFor='value'> Wpisz nazwę składnika po angielsku:</label>
						<input
							type='text'
							id='value'
							name='value'
							value={newIngredient.value}
							onChange={handleChange}
						/>
					</div>
					<button type='submit' className='button'>
						Zapisz
					</button>
				</form>
			</div>
			<div
				className={`ingredients-table ${
					addIngerientActive ? 'open-ingredients' : ''
				} `}>
				<table className='table'>
					<thead>
						<tr>
							<th>Nazwa polska</th>
							<th>Nazwa angielska</th>
							<th>Akcje</th>
						</tr>
					</thead>
					<tbody>
						{localIngredients.map(item => (
							<tr>
								<td>{item.label.toLowerCase()}</td>
								<td>
									{item.value

										.split(/(?=[A-Z])/)
										.map(s => s.toLowerCase())
										.join(' ')
										.replaceAll('_', ' ')}
								</td>
								<td className='actions'>
									<button
										className='button'
										onClick={() => editItem(item.firestoreId)}>
										Edytuj
									</button>

									<button
										className='button btn-delete'
										onClick={() => deleteItem(item.firestoreId)}>
										Usuń
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div>
				<Modal open={modalOpen} onClose={onCloseModal} center>
					<p>{modalContent.h2}</p>

					<ul>{modalContent.list}</ul>
				</Modal>
			</div>
		</div>
	);
};
