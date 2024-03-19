import React, { useEffect, useState, useContext} from 'react'
import './CartPage.css'

import Table from './../Common/Table';
import QuantityInput from '../SingleProduct/QuantityInput';
import removeIcon from '../../assets/remove.png'
import UserContext from '../../Contexts/UserContext';
import cartContext from '../../Contexts/CartContext';

import { toast } from 'react-toastify';

const CartPage = () => {
	const user = useContext(UserContext)
	const [subTotal, setSubTotal] = useState(0)
	const {cart, removeFromCart,updateCart, setCart} = useContext(cartContext)
	useEffect(()=>{
		let total = 0
		cart.forEach(item => {
			total += item.product.price*item.quantity
			
		});
		setSubTotal(total)
	},[cart])

	const addtoCart = () =>{
		const oldCart = [...cart]
		setCart([])
		checkoutAPI().then(() =>{
			toast.success("Item submitted successfully ")
		}
		).catch(() => {
			toast.error("Something Wrong Happened")
			setCart(oldCart)
		})
	}
	
	return (
		<section className="align_center cart_page">
			<div className="align_center user_info">
				<img src={`http://localhost:5000/profile/${user?.profilePic}`} alt="User Profile" />
				<div>
					<p className="user_name">{user?.name}</p>
					<p className="user_email">{user?.email}</p>
				</div>
			</div>
			{/* cart table */}
			<Table headings={["Item", "Price","Quantity","Total","Remove"]}>
				
			<tbody>	
				{cart.map(({product,quantity})=>
				<tr key={product._id}>
				<td>{product.title}</td>
				<td>${product.price}</td>
				<td>
					<QuantityInput 
					quantity={quantity} 
					stock={product.stock} 
					setQuantity={updateCart}
					cartPage = {true}
					productID = {product._id}
					
					/>
				</td>
				<td>${quantity*product.price}</td>
				<td><img src={removeIcon} 
				alt="Remove Icon" className='cart_remove_icon' 
				onClick={() => removeFromCart(product._id)}
				/></td>
			</tr>
				
				)}				
				
				
			</tbody>

			</Table>

			<table className="cart_bill">
			<tbody>
				<tr>
					<td>SubTotal</td>
					<td>${subTotal}</td>
				</tr>
				<tr>
					<td>Shipping Fee</td>
					<td>$5</td>
				</tr>
				<tr className='cart_bill_final'>
					<td>Total</td>
					<td>${subTotal + 5}</td>
				</tr>
			</tbody>

			</table>
			<button className="search_button checkout_button" onClick={()=> addtoCart()}>Checkout</button>

		</section>

	)
}

export default CartPage
