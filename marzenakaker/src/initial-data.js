export const categoryDict = [
	{
		label: 'Urodzinowe',
		value: 'Birthday',
		translationKey: 'CATEGORY_DICT_BIRTHDAY',
	},
	{
		label: 'Ślubne',
		value: 'Wedding',
		translationKey: 'CATEGORY_DICT_WEDDING',
	},
	{
		label: 'Inne',
		value: 'Other',
		translationKey: 'CATEGORY_DICT_OTHER',
	},
];

export const ingredientsDict = [
	{
		label: 'Jajka',
		value: 'eggs',
		translationKey: 'INGREDIENTS_DICT_EGGS',
	},
	{
		label: 'Masło',
		value: 'butter',
		translationKey: 'INGREDIENTS_DICT_BUTTER',
	},
	{
		label: 'Mąka',
		value: 'flour',
		translationKey: 'INGREDIENTS_DICT_FLOUR',
	},
	{
		label: 'Mleko',
		value: 'milk',
		translationKey: 'INGREDIENTS_DICT_MILK',
	},
	{
		label: 'Mascarpone',
		value: 'mascarpone',
		translationKey: 'INGREDIENTS_DICT_MASCARPONE',
	},
	{
		label: 'Orzechy',
		value: 'nuts',
		translationKey: 'INGREDIENTS_DICT_NUTS',
	},
	{
		label: 'Śmietana',
		value: 'cream',
		translationKey: 'INGREDIENTS_DICT_CREAM',
	},
	{
		label: 'Biszkopt',
		value: 'bisquit',
		translationKey: 'INGREDIENTS_DICT_BISQUIT',
	},
	{
		label: 'Cukier waniliowy',
		value: 'vanillaSugar',
		translationKey: 'INGREDIENTS_DICT_VANILLA_SUGAR',
	},
	{
		label: 'Cukier',
		value: 'sugar',
		translationKey: 'INGREDIENTS_DICT_SUGAR',
	},
];

export const initialData = [
	{
		id: 1,
		photos: [
			{
				src: '/torty/tort1.jpg',
				alt: 'tort1',
				type: 'standard',
			},
			{
				src: '/torty/tort1a.jpg',
				alt: 'tort2',
				type: 'main',
			},
			{
				src: '/torty/tort1b.jpg',
				alt: 'tort1b',
				type: 'standard',
			},
		],
		name: {
			pl: 'Tort z kamperem',
			en: 'Cake with camper',
		},
		description: {
			pl: 'Lorem ipsum dolor sit amet consectetur adipisicing ',
			en: 'Something in English',
		},
		category: 'Birthday',
		subcategory: 'small',
		weight: 1,
		persons: 3,
		ingredients: ['flour', 'sugar', 'bisquit', 'milk', 'nuts'],
		state: 'active',
	},
	{
		id: 2,
		photos: [
			{
				src: '/torty/tort2.jpg',
				alt: 'alt',
				type: 'main',
			},
		],
		name: {
			pl: 'Golf',
			en: 'Golf',
		},
		description: {
			pl: 'Lorem ipsum dolor sit amet consectetur adipisicing ',
			en: 'This is another jing of cake',
		},
		category: 'Other',
		subcategory: 'medium',
		weight: 2,
		persons: 5,
		ingredients: ['flour', 'sugar', 'bisquit', 'milk', 'cream'],
		state: 'active',
	},
	{
		id: 3,
		photos: [
			{
				src: '/torty/tort3.jpg',
				alt: 'alt',
				type: 'main',
			},
		],
		name: {
			pl: 'Spidey',
			en: 'Spidey',
		},
		description: {
			pl: 'Lorem ipsum dolor sit amet consectetur adipisicing ',
			en: 'This is another jing of cake',
		},
		category: 'Wedding',
		subcategory: 'medium',
		weight: 3,
		persons: 8,
		ingredients: ['flour', 'sugar', 'bisquit', 'milk', 'eggs'],
		state: 'active',
	},
	{
		id: 4,
		photos: [
			{
				src: '/torty/tort4.jpg',
				alt: 'alt',
				type: 'main',
			},
		],
		name: {
			pl: 'Arsenal',
			en: 'Arsenal',
		},
		description: {
			pl: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis illum reiciendis delectus adipisci esse, possimus numquam at expedita eaque recusandae.',
			en: 'But I must explain to you how all this mistaken idea of denouncing of a pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human ',
		},
		category: 'Other',
		subcategory: 'medium',
		weight: 4,
		persons: 7,
		ingredients: ['flour', 'sugar', 'bisquit', 'eggs'],
		state: 'active',
	},
	{
		id: 5,
		photos: [
			{
				src: '/torty/tort5.jpg',
				alt: 'alt',
				type: 'main',
			},
		],
		name: {
			pl: 'Roblox',
			en: 'Rolbox',
		},
		description: {
			pl: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis illum reiciendis delectus adipisci esse, possimus numquam at expedita eaque recusandae.',
			en: 'But I must explain to you how all this mistaken idea of denouncing of a pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human ',
		},
		category: 'Birthday',
		subcategory: 'large',
		weight: 3,
		persons: 6,
		ingredients: ['flour', 'sugar', 'milk', 'cream'],
		state: 'active',
	},
	{
		id: 6,
		photos: [
			{
				src: '/torty/tort6.jpg',
				alt: 'alt',
				type: 'main',
			},
		],
		name: {
			pl: 'Suitcase',
			en: 'Suitcase',
		},
		description: {
			pl: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis illum reiciendis delectus adipisci esse, possimus numquam at expedita eaque recusandae.',
			en: 'But I must explain to you how all this mistaken idea of denouncing of a pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human ',
		},
		category: 'Birthday',
		subcategory: 'small',
		weight: 2,
		persons: 5,
		ingredients: ['butter', 'sugar', 'mascarpone'],
		state: 'active',
	},
	{
		id: 7,
		photos: [
			{
				src: '/torty/tort7.jpg',
				alt: 'alt',
				type: 'main',
			},
		],
		name: {
			en: 'Anders',
			pl: 'Anders',
		},
		description: {
			pl: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis illum reiciendis delectus adipisci esse, possimus numquam at expedita eaque recusandae.',
			en: 'But I must explain to you how all this mistaken idea of denouncing of a pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human ',
		},
		category: 'Birthday',
		subcategory: 'large',
		weight: 2,
		persons: 10,
		ingredients: ['flour', 'sugar', 'bisquit', 'milk'],
		state: 'active',
	},
	{
		id: 8,
		photos: [
			{
				src: '/torty/tort8.jpg',
				alt: 'alt',
				type: 'main',
			},
		],
		name: {
			pl: 'Franek',
			en: 'Frank',
		},
		description: {
			pl: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis illum reiciendis delectus adipisci esse, possimus numquam at expedita eaque recusandae.',
			en: 'But I must explain to you how all this mistaken idea of denouncing of a pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human ',
		},
		category: 'Birthday',
		subcategory: 'large',
		weight: 1,
		persons: 13,
		ingredients: ['flour', 'sugar', 'bisquit', 'milk'],
		state: 'active',
	},
	{
		id: 9,
		photos: [
			{
				src: '/torty/tort9.jpg',
				alt: 'alt',
				type: 'main',
			},
		],
		name: {
			pl: 'Kuba',
			en: 'James',
		},
		description: {
			pl: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis illum reiciendis delectus adipisci esse, possimus numquam at expedita eaque recusandae.',
			en: 'But I must explain to you how all this mistaken idea of denouncing of a pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human ',
		},
		category: 'Birthday',
		subcategory: 'large',
		weight: 5,
		persons: 14,
		ingredients: ['flour', 'sugar', 'bisquit', 'milk'],
		state: 'active',
	},
	{
		id: 10,
		photos: [
			{
				src: '/torty/tort10.jpg',
				alt: 'alt',
				type: 'main',
			},
		],
		name: {
			pl: 'Amelia',
			en: 'Amelia',
		},
		description: {
			pl: 'Lorem ipsum dolor sit amet consectetur adipisicing ',
			en: 'This is another jing of cake',
		},
		category: 'Birthday',
		subcategory: 'large',
		weight: 2,
		persons: 11,
		ingredients: ['eggs', 'sugar', 'bisquit', 'milk', 'mascarpone'],
		state: 'active',
	},
	{
		id: 11,
		photos: [
			{
				src: '/torty/tort11.jpg',
				alt: 'alt',
				type: 'main',
			},
		],
		name: {
			pl: 'Aleksander',
			en: 'Aleksander',
		},
		description: {
			pl: 'Lorem ipsum dolor sit amet consectetur adipisicing ',
			en: 'This is another jing of cake',
		},
		category: 'Birthday',
		subcategory: 'large',
		weight: 4,
		persons: 9,
		ingredients: ['flour', 'sugar', 'bisquit', 'milk'],
		state: 'active',
	},
	{
		id: 12,
		photos: [
			{
				src: '/torty/tort12.jpg',
				alt: 'alt',
				type: 'main',
			},
		],
		name: {
			pl: 'To chłopiec',
			en: "It's a boy",
		},
		description: {
			pl: 'Lorem ipsum dolor sit amet consectetur adipisicing ',
			en: 'This is another jing of cake',
		},
		category: 'Birthday',
		subcategory: 'small',
		weight: 3,
		persons: 6,
		ingredients: ['flour', 'sugar', 'bisquit', 'milk'],
		state: 'active',
	},
	{
		id: 13,
		photos: [
			{
				src: '/torty/tort13.jpg',
				alt: 'alt',
				type: 'main',
			},
		],
		name: {
			pl: 'SK',
			en: 'SK',
		},
		description: {
			pl: 'Lorem ipsum dolor sit amet consectetur adipisicing ',
			en: 'This is another jing of cake',
		},
		category: 'Wedding',
		subcategory: 'small',
		weight: 3,
		persons: 5,
		ingredients: ['flour', 'sugar', 'bisquit', 'milk'],
		state: 'active',
	},
	{
		id: 14,
		photos: [
			{
				src: '/torty/tort14.jpg',
				alt: 'alt',
				type: 'main',
			},
		],
		name: {
			pl: 'Deimans',
			en: 'Deimans',
		},
		description: {
			pl: 'Lorem ipsum dolor sit amet consectetur adipisicing ',
			en: 'This is another jing of cake',
		},
		category: 'Birthday',
		subcategory: 'medium',
		weight: 3,
		persons: 8,
		ingredients: ['flour', 'sugar', 'bisquit', 'milk'],
		state: 'active',
	},
	{
		id: 15,
		photos: [
			{
				src: '/torty/tort15.jpg',
				alt: 'alt',
				type: 'main',
			},
		],
		name: {
			pl: 'Emilia',
			en: 'Emily',
		},
		description: {
			pl: 'Lorem ipsum dolor sit amet consectetur adipisicing ',
			en: 'This is another jing of cake',
		},
		category: 'Birthday',
		subcategory: 'large',
		weight: 3,
		persons: 11,
		ingredients: ['flour', 'sugar', 'bisquit', 'milk'],
		state: 'active',
	},
	{
		id: 16,
		photos: [
			{
				src: '/torty/tort16.jpg',
				alt: 'alt',
				type: 'main',
			},
		],
		name: {
			pl: 'Bartek',
			en: 'Bart',
		},
		description: {
			pl: 'Lorem ipsum dolor sit amet consectetur adipisicing ',
			en: 'This is another jing of cake',
		},
		category: 'Birthday',
		subcategory: 'large',
		weight: 3,
		persons: 9,
		ingredients: ['flour', 'sugar', 'bisquit', 'milk'],
		state: 'active',
	},
	{
		id: 17,
		photos: [
			{
				src: '/torty/tort17.jpg',
				alt: 'alt',
				type: 'main',
			},
		],
		name: {
			pl: 'Natalia',
			en: 'Natalie',
		},
		description: {
			pl: 'Lorem ipsum dolor sit amet consectetur adipisicing ',
			en: 'This is another jing of cake',
		},
		category: 'Birthday',
		subcategory: 'medium',
		weight: 3,
		persons: 7,
		ingredients: ['flour', 'sugar', 'bisquit', 'milk'],
		state: 'active',
	},
	{
		id: 18,
		photos: [
			{
				src: '/torty/tort18.jpg',
				alt: 'alt',
				type: 'main',
			},
		],
		name: {
			en: 'Vito Belle Show',
			pl: 'Vito Belle Show',
		},
		description: {
			pl: 'Lorem ipsum dolor sit amet consectetur adipisicing ',
			en: 'This is another jing of cake',
		},
		category: 'Birthday',
		subcategory: 'small',
		weight: 3,
		persons: 5,
		ingredients: ['flour', 'sugar', 'bisquit', 'milk'],
		state: 'active',
	},
];
