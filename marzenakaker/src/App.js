import { useState, useEffect} from 'react';
import './App.css';

import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { MainPage } from './components/MainPage';
import { Navbar } from './components/navbar/navbar';
import ProductsList from './components/products-list/products-list';
import { AppContext } from './ContextProvider';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { ProductCard } from './components/product-card/ProductCard';

import { AdminPanel } from './components/Admin/AdminPanel';
import { AdminProductForm } from './components/Admin/admin-product-form/adminProductForm';
import { productsService } from './services/products.service';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { AdminWrapper } from './components/AdminWrapper';
import { getTranslations } from './interface-translation/i18next';

export const getDefaultFilterCriteria = () => ({
	persons: {
		type: 'VALUE_FROM_RANGE_MIN',
		value: 1,
	},
	persons_max: {
		type: 'VALUE_FROM_RANGE_MAX',
		value: 100,
	},
	weight: {
		type: 'VALUE_FROM_RANGE_MIN',
		value: 0.5,
	},
	weight_max: {
		type: 'VALUE_FROM_RANGE_MAX',
		value: 100,
	},
	subcategory: {
		type: 'CHOICE',
		value: [],
	},
	category: {
		type: 'CHOICE',
		value: [],
	},
	ingredients: {
		type: 'CHOICE_FROM_ARRAY',
		value: [],
	},
	// state: 'active'
});

function App() {
	const [filterCriteria, setFilterCriteria] = useState(
		getDefaultFilterCriteria()
	);

	const [ingredientsFilterMethod, setIngredientsFilterMethod] = useState('OR');

	const [sortingCriteria, setSortingCriteria] = useState({
		sortingValue: 'createdAt',
		method: 'asc',
	});

	const [loggedIn, setLoggedIn] = useState(false);
	const [isConnected, setIsConnected] = useState(false);
	const [categories, setCategories] = useState([]);
	const [ingredients, setIngredients] = useState([]);
	const location = useLocation();

	const browserLanguage = navigator.language.slice(0, 2);
	const [language, setLanguage] = useState(
		localStorage.getItem('lang') || browserLanguage || 'pl'
	);

	const isOnAdminPath = location.pathname.includes('admin') ? true : false;
	const changeLanguage = lang => {
		setLanguage(lang);
		localStorage.setItem('lang', lang);
		document.documentElement.setAttribute('lang', lang);
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
			setIsConnected(true);
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
		(async () => {
			const data = await productsService.getIngredientsDictionary();
			setIngredients(data);
		})();
	}, []);
useEffect(() => {
getTranslations()

}, [])
	if (!isConnected) {
		return <></>;
	}
	return (
		<div className='App'>
			<AppContext.Provider
				value={{
					language,
					changeLanguage,
					filterCriteria,
					setFilterCriteria,
					ingredientsFilterMethod,
					setIngredientsFilterMethod,
					filteredProductIds,
					setFilteredProductIds,
					loggedIn,
					setLoggedIn,
					categories,
					ingredients,
					setIngredients,
					sortingCriteria,
					setSortingCriteria,
				}}>
				<Header />
				{isOnAdminPath ? '' : <Navbar />}
				<Routes>
					<Route path='' element={<MainPage />} />
					<Route path='products' element={<ProductsList />} />
					<Route path='products/:id' element={<ProductCard />} />

					<Route path='admin' element={<AdminWrapper />}>
						<Route index element={<AdminPanel />} />
						<Route path='product/add' element={<AdminProductForm />} />
						<Route path='product/edit/:id' element={<AdminProductForm />} />
					</Route>

					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
				<Footer isOnAdminPath={isOnAdminPath} />
			</AppContext.Provider>
			<button
				onClick={() => {
					productsService.sendDataToFirebase()
				}}>
				Create mock
			</button>
		</div>
	);
}

export default App;
