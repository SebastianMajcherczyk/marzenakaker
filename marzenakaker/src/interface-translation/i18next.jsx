import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { productsService } from '../services/products.service';
import en from './en.json';
import pl from './pl.json';


i18next.use(initReactI18next).init({
	resources: {
		en: {
			translation: en,
		},
		pl: {
			translation: pl,
		},
	},
	lng: localStorage.getItem('lang') || 'pl',
	fallbackLng: 'pl',
});


export const getTranslations = async () => {
	const data = await productsService.getLanguageVersions();


	const resources = {
		en: data.translations.en,
		pl: data.translations.pl,
	};

	i18next.addResourceBundle('pl', 'translation', resources.pl, false, true);
	i18next.addResourceBundle('en', 'translation', resources.en, false, true);

};
