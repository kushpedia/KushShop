import React from 'react'
import './QuantityInput.css'

const QuantityInput = ({quantity, setQuantity,stock,cartPage, productID}) => {
	return (
		<div className='align_center quantity_input'>
		<button className="quantity_input_button" 
		disabled ={quantity<1}
		onClick={()=>{
			if(quantity >0){
				cartPage?setQuantity("decrease", productID):setQuantity(quantity-1)
			}
		}}>-</button>
					<p className="quantity_input_count">{quantity}</p>
					<button className="quantity_input_button"
					disabled = {quantity >=stock}
					onClick={()=>
						{
						cartPage?setQuantity("increase", productID):setQuantity(quantity+1)					
					}
				}
					>+</button>
		</div>
	)
}

export default QuantityInput
