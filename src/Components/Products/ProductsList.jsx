import React, { useEffect, useState } from 'react'
import './ProductsList.css'
import ProductCard from './ProductCard'

import useData from '../../Hooks/useData'
import ProductsCardSkeleton from './ProductsCardSkeleton'
import { useSearchParams } from 'react-router-dom'
// import Pagination from '../Common/Pagination'


const ProductsList = () => {
	const [page, setPage] = useState(1)
	const [search, setSearch] = useSearchParams()
	const category = search.get("category")
	const searchQuery = search.get("search")
	const {data, error, isLoading} = useData('/products',{
		params: 
		{
			search : searchQuery,
			category,
			page,
		}
	},[searchQuery, category,page])

	useEffect(() =>{
		setPage(1)
	},[searchQuery,category])

	const skeletons =[1,2,3,4,5,6,7,8]
	// const handlePageChange = (page)=>
	// 	{
	// 	const currentParams = Object.fromEntries([...search])

	// 	setSearch({...currentParams, page : parseInt(currentParams.page)+1
	// 	})
	// }
					
	useEffect(()=>{
		const handleScroll = ()=>{
			const {scrollTop,clientHeight,
			scrollHeight} = document.documentElement
			if(scrollTop+ clientHeight >= scrollHeight-1
				&& !isLoading && data && page<data.totalPages ){
				console.log("end")
				setPage((prev) => prev + 1 )
			}

		}
		window.addEventListener("scroll", handleScroll)
		
		window.removeEventListener("scroll", handleScroll)
	},[])
	
	return (
		<section className="products_list_section">
			<header className="align_center products_list_header">
				<h2>Products</h2>
				<select name="sort" id="" className='products_sorting'>
				<option value=""> Relevance</option>
					<option value="price desc"> Price High to Low</option>
					<option value="price asc"> Price Low to High</option>
					<option value="rate desc"> Price High to Low</option>
					<option value="rate asc"> Price Low to High</option>

				</select>
			</header>
			<div className="products_list">				
				{error && <em className='form_error'>{error}</em>}
				{
				data?.products && data.products.map((product) => (
					<ProductCard key={product._id} 
					product = {product}/>
				))
			}
			{isLoading && skeletons.map((n)=><ProductsCardSkeleton key={n}/>)
					}
		
						
			</div>
			{/* {data &&
			<Pagination totalPosts={data.totalProducts} 
			postsPerPage={8} 
			onClick={handlePageChange} 
			currentPage = {page}/>}
			 */}

			</section>
	)
}

export default ProductsList
