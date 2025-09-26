import React from 'react'
import HotelList from '../HotelList'
const Nainital = () => {
    const hotels = [
        { id: 1, name: "Sunset Resort", city: "Nainital", distance: 3.4, price: 1821, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: 'Villa' , rating:'4.5'},
        { id: 2, name: "Mount View", city: "Nainital", distance: 7.6, price: 1971, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: 'Hotel', rating:'3.5' },
        { id: 3, name: "Sitara Hotel", city: "Nainital", distance: 1, price: 1962, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: 'Hotel', rating:'5' },
        { id: 4, name: "Hilltop Retreat", city: "Nainital", distance: 2.3, price: 2100, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: 'Resort' , rating:'2'},
        { id: 5, name: "Lakeside Inn", city: "Nainital", distance: 0.8, price: 2500, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: 'Hotel' , rating:'1.5'},
        { id: 6, name: "Mountain Breeze", city: "Nainital", distance: 5.1, price: 1800, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: 'Villa', rating:'1.5' },
        { id: 7, name: "Himalayan View Resort", city: "Nainital", distance: 6.2, price: 2700, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: 'Resort', rating:'3.75' },
        { id: 8, name: "Green Valley Stay", city: "Nainital", distance: 3.0, price: 1900, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: 'Hotel' , rating:'2.5'},
        { id: 9, name: "Royal Heritage Hotel", city: "Nainital", distance: 2.7, price: 3200, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: 'Hotel', rating:'2' },
        { id: 10, name: "Pinewood Residency", city: "Nainital", distance: 4.5, price: 2300, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: 'Villa', rating:'3' },
        { id: 11, name: "Cloud 9 Resort", city: "Nainital", distance: 7.8, price: 2800, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: 'Resort' },
        { id: 12, name: "Blue Orchid Hotel", city: "Nainital", distance: 1.6, price: 2400, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: 'Hotel', rating:'4.5' },
        { id: 13, name: "Serene Lake Resort", city: "Nainital", distance: 5.9, price: 2600, img: "https://www.nainitalcorbetttourism.com/images/hotels/nainital-hotels/the-pavilion-hotel-in-nainital.jpg", propertyType: 'Resort' , rating:'5'},
      ];
      const tagline="Nainital-The Lake City of Uttarakhand";
      
  return (
    <div >
    
        <HotelList key={hotels.id} hotels={hotels} tagline={tagline}></HotelList>
      
    </div>
  )
}

export default Nainital
