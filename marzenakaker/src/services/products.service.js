import { initialData, categoryDict } from '../initial-data';

const productsServiceDef = () => {
	const getProducts = async () => {
		return new Promise((resolve) => resolve(initialData));
	};
	const getProductById = async (id) => {
		return new Promise((resolve) => resolve(initialData.find(({ id: elId }) => id == elId)));
	};

	const getCategoryDictionary = async () => {
		return new Promise((resolve) => resolve(categoryDict));

	}
	return {
		getCategoryDictionary,
		getProducts,
		getProductById,
	};
};

export const productsService = productsServiceDef();
