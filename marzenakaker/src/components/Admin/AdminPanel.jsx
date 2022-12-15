import './AdminPanel.css';
import React, { useState } from 'react';
import { LoginForm } from './adminLoginForm';
import { AdminProductList } from './admin-product-list/adminProductList';
import { authService } from '../../services/auth.service';

export const AdminPanel = () => {
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});
	const [loggedIn, setLoggedIn] = useState(false);

	const logIn = async e => {
		e.preventDefault();
		const { email, password } = loginData;
		const user = await authService.login(email, password);
		if (!user) {
			return;
		}
		setLoggedIn(true);
		setLoginData({ email: '', password: '' });
	};
	const logout = async () => {
		await authService.logout();
		setLoggedIn(false);
	};
	const handleChange = e => {
		const { value, name } = e.target;
		const tempState = {
			...loginData,
			[name]: value,
		};
		setLoginData(tempState);
	};
	return (
		<>
			<div className='admin-header'>
				<h2>Panel administracyjny</h2>
				<LoginForm
					loggedIn={loggedIn}
					logIn={logIn}
					logout={logout}
					handleChange={handleChange}
					loginData={loginData}
				/>
			</div>
			{loggedIn ? <AdminProductList /> : ''}
		</>
	);
};
