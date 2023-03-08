import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminContext } from '../ContextProvider';
import { productsService } from '../services/products.service';

export const AdminWrapper = () => {
	const [products, setProducts] = useState([]);
	const getProducts = async () => {
		const data = await productsService.getProducts(false);
		setProducts(data);
	};
    useEffect(() => {
		getProducts();
	}, []);
	return (
		<AdminContext.Provider
			value={{
				products,
                getProducts
			}}>
			
				<Outlet />
			
		</AdminContext.Provider>
	);
};
