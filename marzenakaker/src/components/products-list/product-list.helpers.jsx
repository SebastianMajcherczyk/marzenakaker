export const getProductsByFilters = (
	products,
	filters,
	{ ingredientsFilterMethod }
) => {
	const filtersAsTouple = Object.entries(filters);
	return products.reduce((collector, product) => {
		const isValid = filtersAsTouple.every(([filterKey, { type, value }]) => {
			if (type === 'VALUE') {
				const currentProductAttribute = product[filterKey];

				return value ? currentProductAttribute === +value : true;
			} else if (type === 'CHOICE') {
				//debugger;
				const currentProductAttribute = product[filterKey].toLowerCase();
				return value.length !== 0
					? value.includes(currentProductAttribute)
					: true;
			} else if (type === 'VALUE_FROM_RANGE_MIN') {
				const mainFilterKey = filterKey.split('_')[0];
				const currentProductAttribute = product[mainFilterKey]

				return value ? currentProductAttribute >= +value : true;
			} else if (type === 'VALUE_FROM_RANGE_MAX') {
				const mainFilterKey = filterKey.split('_')[0];
				const currentProductAttribute = product[mainFilterKey];

				return value ? currentProductAttribute <= +value : true;
			} else if (type === 'CHOICE_FROM_ARRAY') {
				// debugger;
				const currentProductAttributes = product[filterKey];
				if (ingredientsFilterMethod === 'OR') {
					return value.length !== 0
						? currentProductAttributes.some(attribute =>
								value.includes(attribute)
						  )
						: true;
				} else {
					return value.length !== 0
						? value.every(attribute =>
								currentProductAttributes.includes(attribute)
						  )
						: true;
				}
			} else {
				return false;
			}
		});

		if (isValid) {
			return [...collector, product];
		} else {
			return collector;
		}
	}, []);
};

