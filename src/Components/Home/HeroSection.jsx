import React from 'react'
import './HeroSection.css'
import { Link } from 'react-router-dom'


const HeroSection = ({title, subtitle, image, link}) => {
	return (
		<div>
			<section className="hero_section">
				<div className="align_center">

					<h2 className="hero_title">{title}</h2>
					<p className="sub_title">{subtitle}</p>
					<Link to={link} className="hero_link">Buy Now
					</Link>

				</div>
				<div className="align_center">
					<img src={image} alt="" className="hero_image" />
				</div>


			</section>
		
		</div>
	)
}

export default HeroSection
