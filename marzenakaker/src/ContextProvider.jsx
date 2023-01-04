import { createContext } from 'react';

export const filterCriteria = {
	filterCriteriaValue: {
		persons: {
			type: 'VALUE',
			value: '',
		},
		persons_max: {
			type: 'VALUE',
			value: '',
		},
		weight: {
			type: 'VALUE',
			value: '',
		},
		weight_max: {
			type: 'VALUE',
			value: '',
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
			value: []
		}
	},
	setFilterCriteriaValue: () => true,
	resetFilterCriteriaValue: () => true,
	filteredProductIds: [],
}

export const AppContext = createContext({
	language: {
		languageValue: 'en',
		setLanguageValue: () => true,
	},
	filterCriteria ,
	loggedIn: '',
	isInEditMode: '',
	idToEdit: '',
	setIdToEdit: () => true
});
