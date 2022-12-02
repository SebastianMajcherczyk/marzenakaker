export const getProductsByFilters = (products, filters) => {
    const filtersAsTouple = Object.entries(filters)

    return products.reduce((collector, product) => {
      
        const isValid = filtersAsTouple.every(([filterKey, {type, value}]) => {
            if(type === 'VALUE'){ 
                const currentProductAttribute = product[filterKey]
           
                    return value ? currentProductAttribute  === value : true;
                    
                }else if(type==='CHOICE'){
                    //debugger;
                    const currentProductAttribute = product[filterKey].toLowerCase()
                    return value.length !== 0 ? value.includes(currentProductAttribute) : true
                }else {
                    return false
                }
           
        })

        if(isValid){
            return [...collector, product]
        } else {
            return collector
        }
    }, [])
}

