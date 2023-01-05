
import React, { useState, useContext } from 'react';
import { AppContext } from '../../ContextProvider';

import { authService } from '../../services/auth.service';
import './adminLoginForm.css';

export const LoginForm = () => {
	const {loggedIn} = useContext(AppContext)
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});

	const logIn = async e => {
		e.preventDefault();
		const { email, password } = loginData;
		const user = await authService.login(email, password);
		if (!user) {
			return;
		}
		
		setLoginData({ email: '', password: '' });
	};
	const logout = async () => {
		await authService.logout();
		
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
		<div>
			{loggedIn ? (
				<div className='logout-form'>
					<span>Administrator zalogowany</span>
					<button className='button' onClick={logout}>Wyloguj</button>
				</div>
			) : (
				<form className='loginForm'>
					<div className='group'>
						<input
							id='email'
							type='email'
							name='email'
							value={loginData.email}
							onChange={handleChange}
						/>
						<label className='label' htmlFor='email'>
							Email
						</label>
					</div>
					<div className='group'>
						<input
							id='password'
							type='password'
							name='password'
							value={loginData.password}
							onChange={handleChange}
						/>
						<label className='label' htmlFor='password'>
							Password
						</label>
						<button className='loginButton buttonColor' onClick={logIn}>
							Log in
						</button>
					</div>
				</form>
			)}
		</div>
	);
};
