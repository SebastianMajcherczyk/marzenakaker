import React from 'react';
import { useState } from 'react';

import './adminLoginForm.css';

export const LoginForm = ({loggedIn, logIn, logout, handleChange, loginData}) => {
	


	return (
		<div>
			{loggedIn ? (
				<div className='logout-form'>
					<span>Administrator zalogowany</span>
					<button onClick={logout}>Wyloguj</button>
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
