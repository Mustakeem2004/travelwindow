import React from 'react'
import HotelList from '../HotelList'

const Dehradun = () => {
    const hotels = [
        { id: 1, name: "Doonscape Residency", city: "Dehradun", distance: 2.1, price: 2100, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: "Hotel" },
        { id: 2, name: "Valley View Retreat", city: "Dehradun", distance: 4.3, price: 2800, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: "Villa" },
        { id: 3, name: "The Himalayan Nest", city: "Dehradun", distance: 1.7, price: 2500, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: "Resort" },
        { id: 4, name: "Green Valley Inn", city: "Dehradun", distance: 3.8, price: 2200, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: "Hotel" },
        { id: 5, name: "Doonga Retreat", city: "Dehradun", distance: 5.0, price: 33000, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: "Resort" },
        { id: 6, name: "Serenity Stay", city: "Dehradun", distance: 2.9, price: 32400, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: "Hotel" },
        { id: 7, name: "Cloud Nine Hotel", city: "Dehradun", distance: 6.2, price: 3200, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: "Hotel" },
        { id: 8, name: "Pinewood Residency", city: "Dehradun", distance: 1.5, price: 2700, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: "Villa" },
        { id: 9, name: "Royal Orchid Stay", city: "Dehradun", distance: 4.9, price: 20000, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: "Resort" },
        { id: 10, name: "Doonside Bliss", city: "Dehradun", distance: 3.0, price: 2600, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: "Hotel" },
      ];
      const tagline="Dehradun";

      
  return (
    <div>
        
        <HotelList key={hotels.id} hotels={hotels} tagline={tagline}></HotelList>

       

      
    </div>
  )
}

export default Dehradun
