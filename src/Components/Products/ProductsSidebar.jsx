import React from 'react'
import './ProductsSidebar.css'
import LinkWithicon from './../Navbar/LinkWithicon';

import useData from '../../Hooks/useData'
const ProductsSidebar = () => {
	const {data:categories,error}= useData('/category')
	return (
		
		<aside className="products_sidebar">
			<h2>Category</h2>
			<div className="category_links">
			{error && <em className='form_error'>{error}</em>}
				{
					categories && categories.map(category => (

						<LinkWithicon title={category.name} 
						key={category._id}
						id={category.id}
						link={`/products?category=${category.name}`} 
						emoji={`http://localhost:5000/category/${category.image}`} 
						sidebar={true}/>
					))
				}
			

			</div>

		</aside>
		
	)
}

export default ProductsSidebar
