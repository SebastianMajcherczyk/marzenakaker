import React from 'react';
import { AdminLoginForm } from './adminLoginForm';
import { AdminProductList } from './adminProductList';

export const AdminPanel = () => {
	return (
		<>
			<div>AdminPanel</div>
			<AdminLoginForm />
			<AdminProductList />
		</>
	);
};
