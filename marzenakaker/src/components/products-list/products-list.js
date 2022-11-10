import { useMemo } from 'react'
import Product from '../product/product'

const initialData = [
    {
        photo: {
            src: 'link',
            alt: 'alt'
        },
        name: 'test',
        description: 'test desc'
    },
    {
        photo: {
            src: 'link',
            alt: 'alt'
        },
        name: 'test',
        description: 'test desc'
    }
]

const ProductsList = () => {
    const data = useMemo(() => initialData, [])

    return data.map(product => <Product product={product} />)
}

export default ProductsList;