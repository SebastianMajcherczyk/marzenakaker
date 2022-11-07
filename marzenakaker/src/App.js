import { useState } from 'react';
import './App.css';
import { About } from './components/about/about';
import { Banner } from './components/banner/banner';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Navbar } from './components/navbar/navbar';

function App() {
	const [language, setLanguage] = useState('en');
	const changeLanguage = lang => {
		setLanguage(lang);
		console.log('Language:' + language);
	};

	return (
		<div className='App'>
			<Header />
			<Navbar language={language} />
			<Banner />
			<About language={language} />
			<Footer changeLanguage={changeLanguage} />
		</div>
	);
}

export default App;
