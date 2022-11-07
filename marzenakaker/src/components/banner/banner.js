import React from 'react';
import ImageGallery from 'react-image-gallery';


import './banner.css';

const images = [
	{
		original: require('./pict1.jpg'),
		thumbnai: require('./pict1.jpg'),
		originalHeight: '10%',
		
	},
	{
		original: require('./pict2.jpg'),
		thumbnai: require('./pict2.jpg'),
		originalHeight: '10%',
		
	},
	{
		original: require('./pict1.jpg'),
		thumbnai: require('./pict1.jpg'),
		originalHeight: '10%',
		
	},
	{
		original: require('./pict2.jpg'),
		thumbnai: require('./pict2.jpg'),
		originalHeight: '10%',
		
	},
	
];

export const Banner = () => {
	return (
		<div className='banner'>
			<ImageGallery
				items={images}
				showThumbnails={false}
				autoPlay={true}
				showPlayButton={false}
				showFullscreenButton={false}
		        showNav={false}
				infinite={true}
				useTranslate3D={true}
			/>
		
		</div>

	
	);
};
