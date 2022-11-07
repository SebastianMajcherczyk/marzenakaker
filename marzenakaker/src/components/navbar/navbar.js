import React from 'react';
import './navbar.css';

export const Navbar = ({ language }) => {
	return (
		<nav>
			<div className='nav-container'>
				{language === 'pl' && (
					<div>
						<a href='/#about-me' className='nav-link'>
							O MNIE
						</a>
						<a href='#' className='nav-link'>
							OFERTA
						</a>
					</div>
				)}
				{language === 'en' && (
					<div>
						<a href='/#about-me' className='nav-link'>
							ABOUT ME
						</a>
						<a href='#' className='nav-link'>
							OFFER
						</a>
					</div>
				)}
			</div>
		</nav>
	);
};
