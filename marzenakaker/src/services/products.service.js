import {
	initialData as initialDataDef,
	categoryDict,
	ingredientsDict,
} from '../initial-data';

let initialData = initialDataDef;

const productsServiceDef = () => {
	const getProducts = async () => {
		return new Promise(resolve => resolve(initialData));
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
			const productIndex = initialData.findIndex(({id: elId}) => id == elId)

			initialData[productIndex] = {
				...newProduct,
				id
			}

		
			resolve();
		});
	};

	const addProduct = async (product) => {
		
	}
	const getCategoryDictionary = async () => {
		return new Promise(resolve => resolve(categoryDict));
	};

	const getIngredientsDictionary = async () => {
		return new Promise(resolve => resolve(ingredientsDict));
	};
	return {
		editProductById,
		deleteProductById,
		getIngredientsDictionary,
		getCategoryDictionary,
		getProducts,
		getProductById,
	};
};

export const productsService = productsServiceDef();
