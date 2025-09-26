import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import HotelCard from "./HotelCard";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [hotelsData, setHotelsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch hotel details from Google Places API for each hotelId
  useEffect(() => {
    const fetchHotelDetails = async () => {
      if (!cartItems || cartItems.length === 0) {
        setHotelsData([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const fetchedHotels = await Promise.all(
          cartItems.map(async (item) => {
            const res = await fetch(
              `https://travelwindow-backend.onrender.com/${item.hotelId}/details`
            );
            const data = await res.json();
            return data; // full hotel info from your backend proxy
          })
        );
        setHotelsData(fetchedHotels);
        
      } catch (err) {
        console.error("Error fetching hotels in cart:", err);
        setHotelsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [cartItems]);

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeigh:"100vh",
      }}
    >
      <h1>🛒 Your Cart</h1>

      {loading && <p>Loading your cart...</p>}

      {!loading && hotelsData.length === 0 && <p>No hotels added yet.</p>}

      {!loading &&
        hotelsData.map((hotel, index) => (
          <div
            key={hotel.id || index}
            style={{
              position: "relative",
              width: "1000px",
              marginBottom: "20px",
            }}
          >
            <HotelCard hotel={hotel} />
            
            
            <button
              onClick={() =>
                removeFromCart(cartItems[index]?.hotelId || hotel.place_id)
              }
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              ❌ Remove
            </button>
          </div>
        ))}
    </div>
  );
};

export default Cart;

