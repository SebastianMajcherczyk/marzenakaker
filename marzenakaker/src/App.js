import { useState, useEffect, useContext, useMemo } from 'react';
import './App.css';

import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { MainPage } from './components/MainPage';
import { Navbar } from './components/navbar/navbar';
import ProductsList from './components/products-list/products-list';
import { AppContext } from './ContextProvider';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { ProductCard } from './components/product-card/ProductCard';
import { ErrorPage } from './components/error-page/ErrorPage';
import { AdminPanel } from './components/Admin/AdminPanel';
import { AdminProductForm } from './components/Admin/admin-product-form/adminProductForm';
import { productsService } from './services/products.service';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { filterCriteria as filterCriteriaDef } from './ContextProvider';

function App() {
	const [loggedIn, setLoggedIn] = useState(false);

	const [categories, setCategories] = useState([]);

	const location = useLocation();

	const browserLanguage = (navigator.language.slice(0,2));
	const [language, setLanguage] = useState(
		localStorage.getItem('lang') || browserLanguage || 'pl'
	);

	
	const changeLanguage = lang => {
		setLanguage(lang);
		localStorage.setItem('lang', lang);
		document.documentElement.setAttribute("lang", lang)
	};


	const [filteredProductIds, setFilteredProductIds] = useState([]);

	useEffect(() => {
		if (language === 'pl') {
			document.title = 'Torty na zamówienie';
		} else if (language === 'en') {
			document.title = 'Custom made cakes';
		}
	}, [language]);
	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, user => {
			if (user) {
				setLoggedIn(true);
			} else {
				setLoggedIn(false);
				
			}
		});
	}, []);
	useEffect(() => {
		(async () => {
			const data = await productsService.getCategoryDictionary();
			setCategories(data);
		})();
	}, []);


	return (
		<div className='App'>
			<AppContext.Provider
				value={{
					language,
					changeLanguage,
					
					filteredProductIds,
					setFilteredProductIds,
					loggedIn,
					setLoggedIn,
					categories,
					filterCriteriaDef,
				}}>
				<Header />
				{location.pathname.includes('admin') ? '' : <Navbar />}
				<Routes>
					<Route path='/admin' element={<AdminPanel />} />
					<Route path='/admin/product/add' element={<AdminProductForm />} />
					<Route
						path='/admin/product/edit/:id'
						element={<AdminProductForm />}
					/>

					<Route path='/' element={<MainPage />} />
					<Route path='/products' element={<ProductsList />} />
					<Route path='/products/:id' element={<ProductCard />} />

					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
				<Footer />
			</AppContext.Provider>
		</div>
	);
}

export default App;
