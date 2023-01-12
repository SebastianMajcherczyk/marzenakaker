import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GB from './gb.png';
import PL from './pl.png';
import './footer.css';

import { AppContext } from '../../ContextProvider';

export const Footer = ({isOnAdminPath}) => {
	const { changeLanguage } = useContext(AppContext);

	return (
		<footer className='footer'>

		
			<div className={`footer-container ${isOnAdminPath? 'admin-view' : ''} `}>
				<h4>Language/język:</h4>
				<div className='flagbox'>
					<button className='polish' onClick={() => changeLanguage('pl')}>
						<img src={PL} alt='Polish flag' className='flag' />
					</button>
					<button className='english' onClick={() => changeLanguage('en')}>
						<img src={GB} alt='British flag' className='flag' />
					</button>
				</div>
				
			</div>
		</footer>
	);
};
