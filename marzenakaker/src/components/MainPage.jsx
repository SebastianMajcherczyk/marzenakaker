import React from 'react'
import { About } from './about/about'
import { Banner } from './banner/banner'
import {Link} from 'react-router-dom'

export const MainPage = () => {
  return (
    <div>
<Link to='/products'> <Banner/> </Link>
<About/>

    </div>
  )
}
