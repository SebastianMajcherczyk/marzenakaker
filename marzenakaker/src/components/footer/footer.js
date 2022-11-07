import React from 'react';
import GB from './gb.png';
import PL from './pl.png';
import './footer.css';

export const Footer = ({changeLanguage}) => {
	
	
	return (
		<footer className='footer'>
			<div className='container'>
				<h4>Language/język:</h4>
				<div className='flagbox'>
					<button className='polish' onClick={() => changeLanguage('pl')} >
						<img src={PL} alt='Polish flag' className='flag' />
					</button>
					<button className='english' onClick={() => changeLanguage('en')} >
						<img src={GB} alt='British flag' className='flag' />
					</button>
				</div>
			</div>
			
		</footer>
	);
};
