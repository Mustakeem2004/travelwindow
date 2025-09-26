// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const userId = user?._id;

  const [cartItems, setCartItems] = useState([]);
  const BASE_URL = "https://travelwindow-backend.onrender.com/api/cart";

  // Fetch cart when userId changes
  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      try {
        const res = await fetch(`${BASE_URL}/${userId}`,{credentials: "include"});
        if (!res.ok) throw new Error("Failed to fetch cart");
        const data = await res.json();
        setCartItems(data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCart();
  }, [userId]);

  // Add to cart
  const addToCart = async (hotelId) => {
    if (!userId) {
      alert("Please Login First");
      
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, hotelId}),
        credentials: "include"
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setCartItems(data); // update cart UI
      alert("Hotel added to cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
    
  };

  // Remove from cart
  // const removeFromCart = async (hotelId) => {
  //   if (!userId) 
  //     return

  //   try {
  //     const res = await fetch(`${BASE_URL}/remove/${userId}/${hotelId}`, {
  //       method: "DELETE",
  //     });
  //     if (!res.ok) throw new Error(await res.text());
  //     const data = await res.json();
  //     setCartItems(data);
  //   } catch (err) {
  //     console.error("Error removing from cart:", err);
  //   }
  // };

  const removeFromCart = async (hotelId) => {
  if (!userId) return;

  // 1️⃣ Update UI immediately (optimistic update)
  setCartItems(cartItems.filter((item) => item.hotelId !== hotelId));

  try {
    const res = await fetch(`${BASE_URL}/remove/${userId}/${hotelId}`, {
      method: "DELETE",
      credentials: "include"
    });
    if (!res.ok) throw new Error(await res.text());
    // 2️⃣ Optionally update cartItems from server response
    const data = await res.json();
    setCartItems(data); 
  } catch (err) {
    console.error("Error removing from cart:", err);
    // 3️⃣ rollback in case of error
    fetch(`${BASE_URL}/${userId}`)
      .then((res) => res.json())
      .then((data) => setCartItems(data));
  }
};

  if (loading) return <div>Loading...</div>;

  return (
    <CartContext.Provider value={{ cartItems,cartCount: cartItems.length, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
