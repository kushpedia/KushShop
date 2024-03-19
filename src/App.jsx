import React, { useEffect, useState } from 'react'
import { ToastContainer,toast } from 'react-toastify'
import UserContext from './Contexts/UserContext'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Routing from './Components/Routes/Routing'
import {getJWT, getuser } from './services/userService'
import setAuthToken from './utils/SetAuthToken'
import { addToCartAPI, decreaseProductAPI, getCartAPI, increaseProductAPI, removeFromCartAPI } from './services/cartServices'
import 'react-toastify/dist/ReactToastify.css'
import cartContext from './Contexts/CartContext';


setAuthToken(getJWT())
function App() {
  
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)
  useEffect(() => {
    try {      
      const jwtUser = getuser()
      if(Date.now() >= jwtUser.exp *1000){
        localStorage.removeItem("token")
        location.reload()
      }
      else{
        setUser(jwtUser)
      }
      
      
    } catch (error) {
      
    }
  },[])
  const addToCart = (product, quantity) => {
    const updatedCart = [...cart]
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id)

    if (productIndex === -1){
      updatedCart.push({product: product, quantity: quantity})
    }
    else {
      updatedCart[productIndex].quantity +=quantity;
    } 
    setCart(updatedCart)
    addToCartAPI(product._id, quantity)
    .then(res =>{
      toast.success("Item Added to Cart")
    }).catch(err => {
      toast.error("Failed to add to cart")
      setCart(cart)
    })

    }
  const getCart = () =>{
    getCartAPI()
    .then(res => {
      setCart(res.data)
    })
    .catch(err => {
      toast.error("something went wrong")
    })
  }

  useEffect(()=>{
    if(user){
      getCart()
    }
  },[user])
  const removeFromCart = id =>{
    const oldCart = [...cart]
    const newcart = oldCart.filter(item => item.product._id !==id)
    setCart(newcart)
    removeFromCartAPI(id)
    .catch(err =>{
      toast.error("something went wrong")
      setCart(oldCart)
    })
  }

  const updateCart = (type,id)=>{
    const upDatedCart = [...cart]
    const oldCart = [...cart]
    const productIndex = upDatedCart.findIndex(item => item.product._id === id)
    if(type ==="increase"){
      upDatedCart[productIndex].quantity +=1
      setCart(upDatedCart)


      increaseProductAPI(id).catch(err =>
        {
        toast.error("Something went Wrong")
        setCart(oldCart)
      })

    }
  
    if(type ==="decrease"){
      upDatedCart[productIndex].quantity -=1
      setCart(upDatedCart)

      decreaseProductAPI(id).catch(err =>{
        toast.error("Something went Wrong")
        setCart(oldCart)
      })

}
  }
  return (
    <UserContext.Provider value={user}>
      <cartContext.Provider value={{cart,addToCart, removeFromCart, updateCart, setCart}}>
    <div className='app'>
    
      <Navbar/>
      <main>
        <ToastContainer position='bottom-right'/>
        <Routing/>   
      </main>
    </div>
    </cartContext.Provider>
    </UserContext.Provider> 
  )
}

export default App
