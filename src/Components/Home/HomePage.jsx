import React from 'react'
import HeroSection from './HeroSection'
import iphone from '../../assets/iphone-14-pro.webp'
import mac from '../../assets/mac-system-cut.jfif'
import FeaturedProducts from './FeaturedProducts'


const HomePage = () => {
	return (
		<div>
			<HeroSection 
			title="Buy Iphone 14 Pro" 
			subtitle="Buy The latest iphone 14 pro with the best camera in market"
			link="/product/65e35e05fc6f2fc8b880242f"
			image = {iphone}
			/>

			<FeaturedProducts/>
			
			
			<HeroSection 
			title="Build the ultimate setup" 
			subtitle="You can add studio display and color matched accessories to your bag..."
			link="/product/65e35e05fc6f2fc8b8802438"
			image = {mac}/>
		
		</div>
	)
}

export default HomePage
