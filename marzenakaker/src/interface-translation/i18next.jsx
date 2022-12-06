import  i18next from 'i18next';
import { initReactI18next} from 'react-i18next'
import en from './en.json'
import pl from './pl.json'


i18next.use(initReactI18next).init({
	resources: {
		en: {
			translation: en
		},
		pl: {
			translation: pl
		},
	},
	lng: localStorage.getItem('lang') || 'en',
});