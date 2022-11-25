import { useState, useEffect, useContext } from 'react';
import './App.css';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { MainPage } from './components/MainPage';
import { Navbar } from './components/navbar/navbar';
import ProductsList from './components/products-list/products-list';
import { AppContext } from './ContextProvider';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ProductCard } from './components/product-card/ProductCard';
import { ErrorPage } from './components/error-page/ErrorPage';


function App() {
	const context = useContext(AppContext)
	const [language, setLanguage] = useState('en');
	const changeLanguage = lang => {
		setLanguage(lang);
	};
	const defaultCriteria = context.filterCriteria.filterCriteriaValue;
	
	const [filterCriteria, setFilterCriteria] = useState(defaultCriteria);

	const [filteredProductIds, setFilteredProductIds] = useState([]);
	const resetFilter = e => {
		e.preventDefault();
		setFilterCriteria(defaultCriteria);
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
			<AppContext.Provider
				value={{
					language,
					changeLanguage,
					filterCriteria,
					setFilterCriteria,
					filteredProductIds,
					setFilteredProductIds,
				}}>
				<Header />
				<Navbar />
				<Routes>
					<Route path='/marzenakaker' element={<Navigate to='/' />} />
					<Route path='/' element={<MainPage />} />
					<Route
						path='/products'
						element={
							<ProductsList
								filterCriteria={filterCriteria}
								setFilterCriteria={setFilterCriteria}
								resetFilter={resetFilter}
							/>
						}
					/>
					<Route path='/products/:id' element={<ProductCard />} />

					<Route path='/*' element={<ErrorPage />} />
				</Routes>
				<Footer />
			</AppContext.Provider>
		</div>
	);
}

export default App;
