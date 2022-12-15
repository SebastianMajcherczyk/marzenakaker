import { createContext } from 'react';

export const AppContext = createContext({
	language: {
		languageValue: 'en',
		setLanguageValue: () => true,
	},
	filterCriteria: {
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
		},
		setFilterCriteriaValue: () => true,
		resetFilterCriteriaValue: () => true,
		filteredProductIds: [],
	},
});

// export const filterContext = createContext(
//     {filterCriteria: {}, setFilterCriteria: () => true, resetFilter: () => true }
// )
