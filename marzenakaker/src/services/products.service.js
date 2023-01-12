import {
	initialData as initialDataDef,
	categoryDict,
	ingredientsDict,
} from '../initial-data';
import { uid } from 'uid';
import { collection, doc, getDocs, getFirestore, query, setDoc } from "firebase/firestore";
import { db } from './../index';
import { async } from '@firebase/util';


let initialData = initialDataDef;

const productsServiceDef = () => {
	// variables
	
	

	// end
	const getProducts = async () => {
		const productRef = collection(db, 'products')
		const snapshots = await getDocs(query(productRef))
		return snapshots.docs.map(snap => snap.data())
		
	};

	const getProductById = async id => {
		return new Promise(resolve =>
			resolve(initialData.find(({ id: elId }) => id == elId))
		);
	};
	const deleteProductById = async id => {
		return new Promise(resolve => {
			initialData = initialData.filter(({ id: elId }) => id != elId);
			resolve();
		});
	};
	const editProductById = async (id, newProduct) => {
		return new Promise(resolve => {
			const productIndex = initialData.findIndex(({ id: elId }) => id == elId);

			initialData[productIndex] = {
				...newProduct,
				id,
			};

			resolve();
		});
	};

	const addProduct = async product => {
		
		return new Promise(resolve => {
			const newId = uid();
			initialData.push({
				id: newId,
				photos: [
					{
						src: 'https://cdn.pixabay.com/photo/2022/10/20/19/31/dog-7535633_960_720.jpg',
						alt: 'dog',
						type: 'main',
					},
				],
				name:{
					pl: product.name,
					en: product.name_en
				},
				description: {
					pl: product.description,
					en: product.description_en
				},
				category: product.category,
				subcategory: product.subcategory,
				weight: product.weight,
				persons: product.persons,
				ingredients: product.ingredients,
				state: 'active'
			});
			console.log(initialData)
			resolve()
		});
	};
	const getCategoryDictionary = async () => {
		return new Promise(resolve => resolve(categoryDict));
	};

	const getIngredientsDictionary = async () => {
		return new Promise(resolve => resolve(ingredientsDict));
	};

	const createProductsMock = async () => {
	
		const productRef = collection(db, 'products')
		for await (let product of initialData ) {
				await setDoc(doc(productRef), product)
		}
	}


	return {
		editProductById,
		deleteProductById,
		addProduct,
		getIngredientsDictionary,
		getCategoryDictionary,
		getProducts,
		getProductById,
		createProductsMock
	};
};

export const productsService = productsServiceDef();
