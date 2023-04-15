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
	query,
	setDoc,
	serverTimestamp,
	where,
	deleteDoc,
	onSnapshot,
	updateDoc,
	arrayRemove,
} from 'firebase/firestore';
import { db } from './../index';

import { storageService } from './storage.service';
import polish from '../interface-translation/pl.json';
import english from '../interface-translation/en.json';

import data from '../backup.json';
import { uid } from 'uid';

let initialData = initialDataDef;

const productsServiceDef = () => {
	const getProducts = async (onlyActive = true) => {
		const collectionRef = collection(db, 'products');
		const queryParams = [];
		if (onlyActive) {
			queryParams.push(where('state', '==', 'active'));
		}

		const q = query(collectionRef, ...queryParams);

		const snapshots = await getDocs(q);
		return snapshots.docs.map(snap => ({
			...snap.data(),
			firestoreId: snap.id,
		}));
	};

	const getCategoryDictionary = async () => {
		const categoryRef = collection(db, 'categoryDict');
		const snapshots = await getDocs(query(categoryRef));
		return snapshots.docs.map(snap => snap.data());
	};

	const getIngredientsDictionary = async () => {
		const ingredientsRef = collection(db, 'ingredientsDict');
		const snapshots = await getDocs(query(ingredientsRef));
		return snapshots.docs.map(snap => ({
			...snap.data(),
			firestoreId: snap.id,
		}));
	};
	const addIngredient = async ingredient => {
		try {
			const collectionRef = collection(db, 'ingredientsDict');
			const data = {
				label: {
					pl: ingredient.pl,
					en: ingredient.en,
				},
				id: ingredient.en + uid(4)
			};
			await addDoc(collectionRef, data);
		} catch (error) {
			console.log(error);
		}
	};
	const editIngredientById = async (id, ingredient) => {
		const ingredientRef = doc(db, 'ingredientsDict', id);

		const data = {
			label: {
				pl: ingredient.pl,
				en: ingredient.en
			}
		
		};
		updateDoc(ingredientRef, data);
	};
	const deleteIngredient = async id => {
		const ingredientRef = doc(db, 'ingredientsDict', id);
		await deleteDoc(ingredientRef);
	};
	const getProductById = async idValue => {
		try {
			const collectionRef = collection(db, 'products');
			const q = query(
				collectionRef,
				where('id', 'in', [Number(idValue), String(idValue)])
			);
			const snapshots = await getDocs(q);
			const docSnap = snapshots.docs[0];
			const data = {
				...docSnap.data(),
				firestoreId: docSnap.id,
			};

			return data;
		} catch (error) {
			console.log(error);
		}
		//return snapshots.docs[0].data();
	};

	const deletePhotoDataByIdAndFileName = async (idValue, imageName) => {
		const collectionRef = collection(db, 'products');
		const q = query(collectionRef, where('id', '==', idValue));
		const snapshots = await getDocs(q);
		const productSnap = snapshots.docs[0];
		const productRef = productSnap.ref;
		const { photos } = productSnap.data();
		const photo = photos.find(element => element.fileName === imageName);

		await updateDoc(productRef, {
			photos: arrayRemove(photo),
		});
	};

	const deleteProductAndConnectedPhotosById = async idValue => {
		const collectionRef = collection(db, 'products');
		const q = query(collectionRef, where('id', '==', idValue));
		const snapshots = await getDocs(q);
		const productSnap = snapshots.docs[0];
		const productRef = productSnap.ref;
		const { photos, id } = productSnap.data();
		for await (const photo of photos) {
			if (photo.fileName) {
				const path = `${id}/${photo.fileName}`;
				await storageService.deleteImage(path);
			}
		}
		deleteDoc(productRef);
	};

	const editProductByFirestoreId = async (firestoreId, product) => {
		const docRef = doc(db, 'products', firestoreId);
		const data = {
			photos: [...product.photos],
			name: {
				pl: product.name,
				en: product.name_en,
			},
			description: {
				pl: product.description,
				en: product.description_en,
			},
			weight: product.weight,
			persons: product.persons,
			category: product.category,
			subcategory: product.subcategory,
			ingredients: product.ingredients,
			state: product.state,
		};
		await updateDoc(docRef, data);
	};

	const addProduct = async product => {
		try {
			const collectionRef = collection(db, 'products');

			const data = {
				id: product.id,
				photos: product.photos,
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
			await addDoc(collectionRef, data);
		} catch (error) {
			console.log(error);
		}
	};

	const getLanguageVersions = async () => {
		try {
			const appRef = doc(db, 'app', 'config');
			const snapshots = await getDoc(appRef);
			//const data = snapshots.data();
			return snapshots.data();
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
	const createlanguageMock = async () => {
		const appRef = doc(db, 'app', 'config');
		const translations = {
			pl: polish,
			en: english,
		};

		await setDoc(appRef, { translations });
	};

	const sendDataToFirebase = () => {
		const collectionRef = collection(db, 'products');
		const dataToSend = data.products;
		console.log(dataToSend);
		dataToSend.forEach(product => {
			addDoc(collectionRef, product);
		});
	};

	return {
		getProducts,
		getCategoryDictionary,
		getIngredientsDictionary,
		addIngredient,
		editIngredientById,
		deleteIngredient,
		getProductById,
		deletePhotoDataByIdAndFileName,
		deleteProductAndConnectedPhotosById,
		editProductByFirestoreId,
		addProduct,
		getLanguageVersions,
		createProductsMock,
		createCategoryDictMock,
		createIngredientsDictMock,
		createlanguageMock,
		sendDataToFirebase,
	};
};

export const productsService = productsServiceDef();
