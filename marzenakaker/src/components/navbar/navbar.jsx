import React, { useContext } from 'react';
import { AppContext } from '../../ContextProvider';
import './navbar.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';


export const Navbar = () => {
	const { language } = useContext(AppContext);
	const { t, i18n } = useTranslation();

	useEffect(() => {
		i18n.changeLanguage(language);
	}, [language, i18n]);
	return (
		<nav className='nav-section'>
			<div className='nav-container'>
				<div className='nav-links'>
					<Link to='/' className='nav-link'>
						{t('HOME')}
					</Link>
					<Link to='/#about-me' className='nav-link'>
						{t('ABOUT')}
					</Link>
					<Link to='/products' className='nav-link'>
						{t('OFFER')}
					</Link>
					<Link to='/admin' className='nav-link'>ADMIN</Link>
				</div>
			</div>
		</nav>
	);
};
