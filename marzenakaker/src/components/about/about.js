import React, { useMemo } from 'react';
import Portrait from './54622531-0-10.png';
import { getAboutContent } from './about.content';
import './about.css';

export const About = ({ language }) => {
	const content = useMemo(() => getAboutContent(language), [language]);
	return (
		<section className='container' id='about-me'>
			<img src={Portrait} alt='Portrait' className='img' />
		

			<div className='about-right'>
				<h3 className='h3'>{content.title}</h3>
					<p className='about-me'>
						{content.description}
					</p>
			</div>
		</section>
	);
};
