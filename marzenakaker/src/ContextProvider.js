import { createContext } from 'react';

export const LanguageContext = createContext({
    language: '', setLanguage: () => true
})

// export const filterContext = createContext(
//     {filterCriteria: {}, setFilterCriteria: () => true, resetFilter: () => true }
// )