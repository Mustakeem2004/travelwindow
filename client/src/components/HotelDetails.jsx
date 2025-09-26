
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HotelGallery from "./HotelGallery";
import "./HotelDetails.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { HotelContext } from "../context/HotelContext";
import SearchBar from "./SearchBar"

const HotelDetails = () => {
    const { id,city } = useParams(); // Google Place ID from route
    const {cache}=useContext(HotelContext);
    const [hotel, setHotel] = useState(null);
    const [photo, setPhoto] = useState([]);
    const [loading, setLoading] = useState(true);
     const { addToCart } = useContext(CartContext);


    useEffect(() => {
        const fetchHotelDetails = async () => {
            
            
            try {
    
                const response = await fetch(`https://travelwindow-backend.onrender.com/api/hotel/${id}/details`);
                const data = await response.json();
                setHotel(data);
                return;

            } catch (err) {
                console.error("Error fetching hotel details:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchHotelDetails();
    }, [id]);

    if (loading) return <p className="loading">Loading hotel details...</p>;
    if (!hotel) return <p className="error">Hotel details not available</p>;

    return (

        <div className="hotel-details-container">
            <SearchBar></SearchBar>

            <HotelGallery photos={hotel.photos}></HotelGallery>
            {/* Header */}
            <div style={{ display:"flex", flexDirection:"column",  justifyContent:"flex-start"}}>
                <div className="hotel-section" style={{border:"1px solid black", padding:"20px 2px", borderRadius:"10px" , display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <div style={{marginLeft:"20px"}}>
                        <h1 className="hotel-name">{hotel.name}</h1>
                        <p  className="hotel-address"><strong>Address:</strong> {hotel.address}</p>
                    </div>
                    <div style={{marginRight:"10px"}}>
                    <div  style={{display:"flex", flexDirection:"column", justifyContent:"flex-end", alignItems:"flex-end", }}>
                        {hotel.rating && (
                            <>
                            <p className="hotel-rating" >
                                ⭐ {hotel.rating} 
                            </p>
                            <p style={{margin:"5px", fontSize:"10px"}}>
                              ({hotel.user_ratings_total} reviews)
                            </p>
                            </>
                        )}
                        
                    </div>
                    <button className="addtocart" onClick={() =>{ addToCart(hotel.id) }}

                    >
                    🛒 Add to Cart
                   </button>
                    </div>
                </div>
                {/* Description */}
                <div className="hotel-section">
                    <h2>About this Hotel</h2>
                    <p>
                        {hotel.description ||
                            "This property offers comfortable rooms, great amenities, and a convenient location. Perfect for family vacations, couples, and business travelers."}
                    </p>
                </div>

                {/* Amenities */}
                <div className="hotel-section">
                    <h2>Amenities</h2>
                    <ul className="amenities">
                        {(hotel.amenities && hotel.amenities.length > 0
                            ? hotel.amenities
                            : ["Free Wi-Fi", "Parking", "24/7 Reception", "Restaurant", "Room Service", "Swimming Pool"]
                        ).map((amenity, i) => (
                            <li key={i}>✔ {amenity}</li>
                        ))}
                    </ul>
                </div>

                {/* Booking */}
                <div className="book-now">
                    <button
                        className="book-button"
                        onClick={() => alert("Redirecting to booking partner...")}
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;


