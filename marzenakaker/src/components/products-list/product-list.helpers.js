export const getProductsByFilters = (products, filters) => {
    const filtersAsTouple = Object.entries(filters)
    // debugger
    console.log(filtersAsTouple);
    return products.reduce((collector, product) => {
      
        const isValid = filtersAsTouple.every(([filterKey, filterValue]) => {
            const currentProductAttribute = product[filterKey]
            return filterValue ? currentProductAttribute  == filterValue : true;
        })

        if(isValid){
            return [...collector, product]
        } else {
            return collector
        }
    }, [])
}

