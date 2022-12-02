import { initialData } from '../initial-data';

const productsServiceDef = () => {
	const getProducts = async () => {
		return new Promise((resolve) => resolve(initialData));
	};
	const getProductById = async (id) => {
		return new Promise((resolve) => resolve(initialData.find(({ id: elId }) => id == elId)));
	};
	return {
		getProducts,
		getProductById,
	};
};

export const productsService = productsServiceDef();
