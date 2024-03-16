import React from 'react'
import { Link } from 'react-router-dom'
import HeroImage from "../../assets/1333.jpg";
export const HeroBanner = () => {
  return (
  
         <section>
         <div className="hero">
        <div className="hero-img">
          <img className="img-responsive" src={HeroImage} alt="hero-img" />
        </div>
        <div className="hero-content">
          <div className="">
            <h1 className="hero-title">Watches, Bands, VR Headsets & More.</h1>
          </div>
          <div className="">
            <p className="hero-description">
              Get your next smart wearables at the best price.
            </p>
          </div>
          <div className="hero-btn">
            <Link className="btn btn-primary" to="/products">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  
  )
}
