import React, { useContext } from 'react';
import { AppContext } from '../../ContextProvider';
import './navbar.css';
import { Link } from 'react-router-dom';

export const Navbar = () => {
	const { language } = useContext(AppContext);
	return (
		<nav className='nav-section'>
			<div className='nav-container'>
				{language === 'pl' && (
					<div className='nav-links'>
						<Link to='/' className='nav-link'>
							START
						</Link>
						<Link to='/#about-me' className='nav-link'>
							O MNIE
						</Link>
						<Link to='/products' className='nav-link'>
							OFERTA
						</Link>
					</div>
				)}
				{language === 'en' && (
					<div className='nav-links'>
						<Link to='/' className='nav-link'>
							HOME
						</Link>
						<Link to='/#about-me' className='nav-link'>
							ABOUT ME
						</Link>
						<Link to='/products' className='nav-link'>
							OFFER
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
};
