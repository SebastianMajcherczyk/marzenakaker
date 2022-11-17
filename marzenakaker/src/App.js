import { useState, useEffect } from 'react';
import './App.css';
import { About } from './components/about/about';
import { Banner } from './components/banner/banner';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Navbar } from './components/navbar/navbar';
import ProductsList from './components/products-list/products-list';

function App() {
	const path = process.env.PUBLIC_URL;
	const [language, setLanguage] = useState('en');
	const changeLanguage = lang => {
		setLanguage(lang);
		console.log('Language:' + language);
	};
	useEffect(() => {
		if (language === 'pl') {
			document.title = 'Torty na zamówienie';
		} else if (language === 'en') {
			document.title = 'Custom made cakes';
		}
	}, [language]);
	return (
		<div className='App'>
			
				<Header />
				<Navbar language={language} />
				<Banner />
				<About language={language} />
				<Footer changeLanguage={changeLanguage} />
				<ProductsList />
			
		</div>
	);
}

export default App;
