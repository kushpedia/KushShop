import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import LinkWithicon from './LinkWithicon'
import star from '../../assets/glowing-star.png'
import idButton from '../../assets/id-button.png'
import memo from '../../assets/memo.png'
import order from '../../assets/package.png'
import lock from '../../assets/locked.png'
import rocket from '../../assets/rocket.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import UserContext from '../../Contexts/UserContext'
import cartContext from '../../Contexts/CartContext'
import { getSuggestionsAPI } from '../../services/ProductServices'

function Navbar() {
	const user = useContext(UserContext)
	const {cart} = useContext(cartContext)
	const [search, setSearch] = useState("")
	const [suggestions, setSuggestions] = useState([])
	const navigate = useNavigate()
	const handleSubmit = e =>{
		e.preventDefault()
		if(search.trim() !== ""){
			navigate(`/products?search=${search.trim()}`)
			setSuggestions([])
		}
	}
	useEffect(() => {	
		const delaySuggesion = setTimeout(() =>{
			if(search.trim() !==""){
				getSuggestionsAPI(search).then(res => {
					setSuggestions(res.data)
				}).catch(err => console.log(err))
			}
			else{
				setSuggestions([])
			}			
		
		},300)
		return () => clearTimeout(delaySuggesion)
			
	}, [search])
	
	
	return (
		<nav className='navbar align_center'>
			<div className='align_center'>
				<h1 className="navbar_heading">K_Shop</h1>
				<form action="" 
				className='align_center nabar_form'
				onSubmit={handleSubmit}>
					<input type="text" 
					className='nav_search' 
					id="" placeholder='Search Product'
					value = {search}
					onChange={e => setSearch(e.target.value)} />
					<button type='submit' className='search_button'>Search</button>
					{suggestions.length > 0 && <ul className="search_list">
						{suggestions.map(suggestion =>  
							<li className="search_suggestions_link" key={suggestion._id}>
							<Link to={`/products?search=${suggestion.title}`}
							onClick={() => {
								setSearch("")
								setSuggestions([])
							}}> 
							{suggestion.title} 
							</Link>
						</li>
						)}
						
					</ul>}
				</form>

			</div>
			<div  className='align_center nav_links'>

			
				<LinkWithicon title='Home' link='/' emoji={rocket} />
				<LinkWithicon title='Products' link='/products' emoji={star} />
				{!user &&<>
				<LinkWithicon title='LogIn' link='/login' emoji={idButton} />
				<LinkWithicon title="SignUp" link="/signup" emoji={memo} /></>
				}

				{
				user && <>
				<LinkWithicon title="My Orders" link="/myorders" emoji={order} />
				<LinkWithicon title="Log Out" link="/logout" emoji={lock} /></>				
				}
				<NavLink
				to="/cart" className='align_center'>Cart
				<p className="align_center cart_counts">{cart.length}</p>
				</NavLink>				
				
			</div>
		</nav>
	)
}

export default Navbar
