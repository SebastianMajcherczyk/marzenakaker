import {
	initialData as initialDataDef,
	categoryDict,
	ingredientsDict,
} from '../initial-data';

import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	setDoc,
	serverTimestamp,
	orderBy,
	where,
	deleteDoc,
	ref,
	onSnapshot,
	updateDoc,
} from 'firebase/firestore';
import { db } from './../index';
import { async } from '@firebase/util';

let initialData = initialDataDef;

const productsServiceDef = () => {
	const getProducts = async (sortingCriteria, onlyActive = true) => {
		const collectionRef = collection(db, 'products');
		const queryParams = [];
		if (onlyActive) {
			queryParams.push(where('state', '==', 'active'));
		}
		queryParams.push(
			orderBy(`${sortingCriteria.sortingValue}`, `${sortingCriteria.method}`)
		);
		const q = query(collectionRef, ...queryParams);

		// const q = query(collectionRef, orderBy(`${sortingCriteria.sortingValue}`, `${sortingCriteria.method}`), where ('state', 'in', onlyActive ? ['active'] : ['active', 'inactive']))
		const snapshots = await getDocs(q);
		return snapshots.docs.map(snap => snap.data());
	};

	const getCategoryDictionary = async () => {
		const categoryRef = collection(db, 'categoryDict');
		const snapshots = await getDocs(query(categoryRef));
		return snapshots.docs.map(snap => snap.data());
	};

	const getIngredientsDictionary = async () => {
		const ingredientsRef = collection(db, 'ingredientsDict');
		const snapshots = await getDocs(query(ingredientsRef));
		return snapshots.docs.map(snap => snap.data());
	};

	const getProductById = async idValue => {
		const collectionRef = collection(db, 'products');
		const q = query(
			collectionRef,
			where('id', 'in', [Number(idValue), String(idValue)])
		);
		const snapshots = await getDocs(q);
		return snapshots.docs[0].data();
	};

	const deleteProductById = async idValue => {
		const collectionRef = collection(db, 'products');
		const q = query(collectionRef, where('id', '==', idValue));
		const snapshots = await getDocs(q);
		deleteDoc(snapshots.docs[0].ref);
	};
	// const editProductById = async (id, newProduct) => {
	// 	return new Promise(resolve => {
	// 		const productIndex = initialData.findIndex(({ id: elId }) => id == elId);

	// 		initialData[productIndex] = {
	// 			...newProduct,
	// 			id,
	// 		};

	// 		resolve();
	// 	});
	// };

	const editProductById = async (idValue, product) => {
		console.log(idValue, product);
		const collectionRef = collection(db, 'products');
		const q = query(collectionRef, where('id', '==', idValue));
		const snapshots = await getDocs(q);
		const data = {
			'name.pl': product.name,
			'name.en': product.name_en,
			'description.pl': product.description,
			'description.en': product.description_en,
			weight: product.weight,
			persons: product.persons,
			category: product.category,
			subcategory: product.subcategory,
			ingredients: product.ingredients,
			state: product.state,
			createdAt: serverTimestamp(),
		};
		updateDoc(snapshots.docs[0].ref, data);
	};

	const addProduct = async product => {
		console.log(product);
		try {
			const collectionRef = collection(db, 'products');

			const data = {
				id: product.id,
				photos: [
					{
						src: 'https://cdn.pixabay.com/photo/2022/10/20/19/31/dog-7535633_960_720.jpg',
						alt: 'dog',
						type: 'main',
					},
				],
				name: {
					pl: product.name,
					en: product.name_en,
				},
				description: {
					pl: product.description,
					en: product.description_en,
				},
				category: product.category,
				subcategory: product.subcategory,
				weight: product.weight,
				persons: product.persons,
				ingredients: product.ingredients,
				state: product.state,
				createdAt: serverTimestamp(),
			};
			await addDoc(collection(db, 'products'), data);
			console.log(collectionRef.id);
		} catch (error) {
			console.log(error);
		}
	};

	const createProductsMock = async () => {
		const productRef = collection(db, 'products');
		for await (let product of initialData) {
			await setDoc(doc(productRef), product);
		}
	};
	const createCategoryDictMock = async () => {
		const productRef = collection(db, 'categoryDict');
		for await (let category of categoryDict) {
			await setDoc(doc(productRef), category);
		}
	};

	const createIngredientsDictMock = async () => {
		const productRef = collection(db, 'ingredientsDict');
		for await (let ingredient of ingredientsDict) {
			await setDoc(doc(productRef), ingredient);
		}
	};

	return {
		getProducts,
		getCategoryDictionary,
		getIngredientsDictionary,
		getProductById,
		deleteProductById,
		editProductById,
		addProduct,
		createProductsMock,
		createCategoryDictMock,
		createIngredientsDictMock,
	};
};

export const productsService = productsServiceDef();
