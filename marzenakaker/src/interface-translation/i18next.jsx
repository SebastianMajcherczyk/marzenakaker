import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { productsService } from '../services/products.service';
import en from './en.json';
import pl from './pl.json';

i18next.use(initReactI18next).init({
	resources: {


		en: {
			translation: en
		},
		pl: {
			translation: pl
		},
	},
	lng: localStorage.getItem('lang') || 'pl',
	fallbackLng: 'pl'
})




// const cos = async () => {
// 	await new Promise(resolve => {
// 		setTimeout(() => {
// 			resolve();
// 		}, 2000);
// 	});
	
// 	const data = await productsService.getLanguageVersions();
// 	console.log(data);
// 	//return data;

// 	//console.log(translationConfig());

// 	const resources = {
// 		en: data.translations.en,
// 		pl: data.translations.pl,
// 	};
// 	Object.entries(resources.pl).forEach(([key, value])=> {
// 		i18next.addResource('pl', 'pl', key, value )
// 	})
// 	Object.entries(resources.en).forEach(([key, value])=> {
// 		i18next.addResource('en', 'en',  key, value)

// 	})

// }

// cos()
