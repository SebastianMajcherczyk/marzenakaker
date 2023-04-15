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

	const [newIngredientForm, setNewIngredientForm] = useState({
		pl: '',
		en: '',
	});
	const { ingredients, setIngredients } = useContext(AppContext);
	const { products, getProducts } = useContext(AdminContext);
	const [addIngerientActive, setAddIngredientActive] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleChange = e => {
		const { value, name } = e.target;
		let tempState = {};
		tempState = { ...newIngredientForm, [name]: value };
		setNewIngredientForm({ ...tempState });
	};
	const localIngredients = useMemo(() => [...ingredients], [ingredients]);

	const onSubmit = async e => {
		e.preventDefault();
		if (newIngredientForm.firestoreId) {
			if (newIngredientForm.label !== '' && newIngredientForm.value !== '') {
				setLoading(true);
				const data = {
					pl: newIngredientForm.pl,
					en: newIngredientForm.en,
				};
				await productsService.editIngredientById(
					newIngredientForm.firestoreId,
					data
				);
				setNewIngredientForm({ pl: '', en: '' });

				// setAddIngredientActive(false);
				setLoading(false);
			}
			const data = await productsService.getIngredientsDictionary();
			setIngredients(data);
		} else if (newIngredientForm.pl !== '' && newIngredientForm.en !== '') {
			if (
				localIngredients.some(
					item =>
						item.label.pl.toLowerCase() ===
						newIngredientForm.pl.toLocaleLowerCase()
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
						item.label.en.toLowerCase() ===
						newIngredientForm.en.toLocaleLowerCase()
				)
			) {
				setModalContent({
					h2: `Istnieje już składnik o takiej samej angielskiej nazwie`,
				});
				onOpenModal();
				return;
			} else {
				setLoading(true);
				await productsService.addIngredient(newIngredientForm);
				setNewIngredientForm({ pl: '', en: '' });
				// setAddIngredientActive(false);
				setLoading(false);
			}
		}
		const data = await productsService.getIngredientsDictionary();
		setIngredients(data);
		getProducts();
	};
	const editItem = ingredientId => {
		const ingredientToEdit = ingredients.filter(
			item => item.firestoreId === ingredientId
		);
		setNewIngredientForm({
			pl: ingredientToEdit[0].label.pl,
			en: ingredientToEdit[0].label.en,
			firestoreId: ingredientToEdit[0].firestoreId,
		});
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
					setNewIngredientForm({
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
		console.log(currentIngredient.firestoreId);
		// creating the list of products containig clicked ingredient
		const productsWithIngredient = products.filter(product =>
			product.ingredients.some(
				ingredient => ingredient === currentIngredient.id
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
						<label htmlFor='pl'> Wpisz nazwę składnika po polsku:</label>
						<input
							type='text'
							id='pl'
							name='pl'
							value={newIngredientForm.pl}
							onChange={handleChange}
						/>
					</div>
					<div className='section'>
						<label htmlFor='en'> Wpisz nazwę składnika po angielsku:</label>
						<input
							type='text'
							id='en'
							name='en'
							value={newIngredientForm.en}
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
								<td>{item.label.pl.toLowerCase()}</td>
								<td>{item.label.en.toLowerCase()}</td>
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
