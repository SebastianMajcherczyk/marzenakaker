const firestoreServiceDef = () => {
    let helperValue = null;
	const getProducts = () => {
        helperValue = 4;
    };
    const setProduct = () => {
        helperValue += 4;
    }
	return {
        getProducts,
        setProduct

    };
};

export const firestoreService = firestoreServiceDef()

export const firestoreService2 = {
    helperValue: null,
    getProduct: () => {

    }
}