import React from 'react';
import './header.css';
import { Facebook } from './facebook';
import { Instagram } from './instagram';
import { Link } from 'react-router-dom';


export const Header = () => {
	return (
		<header className='header'>
			<div className=' logos'>
				<a
					href='https://www.facebook.com/profile.php?id=100011947786470'
					target='_blank' rel='noreferrer'>
					<Facebook />
				</a>

				<a
					href='https://instagram.com/marzenakaczmarek688?igshid=YmMyMTA2M2Y='
					target='_blank' rel='noreferrer'>
					<Instagram />
				</a>
				<Link to={'/'} ><h4 className='title'>tortymarzeny.pl</h4></Link>
			</div>
		</header>
	);
};
