import React from 'react';
import './header.css';
import { Facebook } from './facebook';
import { Instagram } from './instagram';



export const Header = () => {
	return (
		<header className='header'>
			<container className='logos'>
				<a
					href='https://www.facebook.com/profile.php?id=100011947786470'
					target='_blank'>
					<Facebook />
				</a>

				<a
					href='https://instagram.com/marzenakaczmarek688?igshid=YmMyMTA2M2Y='
					target='_blank'>
					<Instagram />
				</a>
				<h4 className='title'>marzenakaker.no</h4>
			</container>
		</header>
	);
};
