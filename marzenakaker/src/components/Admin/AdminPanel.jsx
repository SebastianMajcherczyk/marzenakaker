import './AdminPanel.css';
import React, { useContext } from 'react';
import { LoginForm } from './adminLoginForm';
import { AdminProductList } from './admin-product-list/adminProductList';
import { AppContext } from '../../ContextProvider';
import { AdminProductForm } from './admin-product-form/adminProductForm';
export const AdminPanel = () => {
	const {loggedIn} = useContext(AppContext)

	


	return (
		<div >
			<div className='admin-header'>
				<h2>Panel administracyjny</h2>
				<LoginForm
					
				/>
			</div>
			{loggedIn ? (
				<>
					
					<AdminProductList />
				</>
			) : (
				''
			)}
		</div>
	);
};
