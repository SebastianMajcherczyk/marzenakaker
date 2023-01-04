import React from 'react';
import { About } from './about/about';
import { Banner } from './banner/banner';

export const MainPage = () => {
	return (
		<div>
			<Banner />
			<About />
		</div>
	);
};
