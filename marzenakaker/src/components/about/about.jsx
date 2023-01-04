import React from 'react';
import Portrait from './54622531-0-10.png';

import './about.css';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export const About = () => {
	
	const { t, i18n } = useTranslation();
	

	useEffect(() => {
		i18n.changeLanguage(localStorage.getItem('lang'));
	}, [i18n]);


	return (
		<section className='container' id='about-me'>
			<img src={Portrait} alt='Portrait' className='img' />

			<div className='about-right'>
				<h3 className='h3'>{t("ABOUT")}</h3>
				
				<p className='about-me'>{t("ABOUT_CONTENT")}</p>
			</div>
		</section>
	);
};
