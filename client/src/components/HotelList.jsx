



import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import Filters from "./Filters";
import HotelCard from "./HotelCard";
import SearchBar from "./SearchBar";
import { useContext } from "react";
import './HotelList.css'
import filterIcon from './filter.png'
import { HotelContext } from "../context/HotelContext"; // import context





const dummyHotels = [
  {
    id: "h1",
    name: "The Grand Delhi Hotel",
    city: "Delhi",
    rating: 4.5,
    address: "Connaught Place, New Delhi, India",
    propertyType: "Hotel",
    distance: 2,
    price: 8000,
    photos: ["https://images.unsplash.com/photo-1582719478176-2e1a746b58b8?auto=format&fit=crop&w=800&q=80"],
    formatted_address: "Connaught Place, New Delhi, India"
  },
  {
    id: "h2",
    name: "Mumbai Bay View",
    city: "Mumbai",
    rating: 4.2,
    address: "Marine Drive, Mumbai, India",
    propertyType: "Hotel",
    distance: 5,
    price: 9000,
    photos: ["https://images.unsplash.com/photo-1600180758895-1b5d8e3f158e?auto=format&fit=crop&w=800&q=80"],
    formatted_address: "Marine Drive, Mumbai, India"
  },
  {
    id: "h3",
    name: "Rishikesh Riverside Resort",
    city: "Rishikesh",
    rating: 4.8,
    address: "Lakshman Jhula Rd, Rishikesh, Uttarakhand",
    propertyType: "Resort",
    distance: 1,
    price: 7000,
    photos: ["https://images.unsplash.com/photo-1590490351944-d1d9f3cb276d?auto=format&fit=crop&w=800&q=80"],
    formatted_address: "Lakshman Jhula Rd, Rishikesh, Uttarakhand"
  },
  {
    id: "h4",
    name: "Jaipur Royal Palace Hotel",
    city: "Jaipur",
    rating: 4.6,
    address: "MI Road, Jaipur, Rajasthan",
    propertyType: "Hotel",
    distance: 3,
    price: 8500,
    photos: ["https://images.unsplash.com/photo-1617196037172-5b6e76b8f0b4?auto=format&fit=crop&w=800&q=80"],
    formatted_address: "MI Road, Jaipur, Rajasthan"
  },
  {
    id: "h5",
    name: "Goa Beach Resort",
    city: "Goa",
    rating: 4.3,
    address: "Calangute Beach, Goa, India",
    propertyType: "Resort",
    distance: 2,
    price: 9500,
    photos: ["https://images.unsplash.com/photo-1501117716987-c8e7c6a9a2cb?auto=format&fit=crop&w=800&q=80"],
    formatted_address: "Calangute Beach, Goa, India"
  },
  {
    id: "h6",
    name: "Kolkata Heritage Hotel",
    city: "Kolkata",
    rating: 4.1,
    address: "Park Street, Kolkata, West Bengal",
    propertyType: "Hotel",
    distance: 4,
    price: 7500,
    photos: ["https://images.unsplash.com/photo-1617634580784-0b82b22b8f1f?auto=format&fit=crop&w=800&q=80"],
    formatted_address: "Park Street, Kolkata, West Bengal"
  },
  {
    id: "h7",
    name: "Bengaluru Tech Hotel",
    city: "Bengaluru",
    rating: 4.4,
    address: "Whitefield, Bengaluru, Karnataka",
    propertyType: "Hotel",
    distance: 6,
    price: 8200,
    photos: ["https://images.unsplash.com/photo-1615852078443-2d9d4bbd1a72?auto=format&fit=crop&w=800&q=80"],
    formatted_address: "Whitefield, Bengaluru, Karnataka"
  },
  {
    id: "h8",
    name: "Hyderabad Lakeview Hotel",
    city: "Hyderabad",
    rating: 4.5,
    address: "Hussain Sagar, Hyderabad, Telangana",
    propertyType: "Hotel",
    distance: 3,
    price: 8800,
    photos: ["https://images.unsplash.com/photo-1600180758531-98c5f6f13f83?auto=format&fit=crop&w=800&q=80"],
    formatted_address: "Hussain Sagar, Hyderabad, Telangana"
  },
  {
    id: "h9",
    name: "Chennai Marina Hotel",
    city: "Chennai",
    rating: 4.0,
    address: "Marina Beach, Chennai, Tamil Nadu",
    propertyType: "Hotel",
    distance: 2,
    price: 7000,
    photos: ["https://images.unsplash.com/photo-1582719478176-2e1a746b58b8?auto=format&fit=crop&w=800&q=80"],
    formatted_address: "Marina Beach, Chennai, Tamil Nadu"
  },
  {
    id: "h10",
    name: "Pune Hills Resort",
    city: "Pune",
    rating: 4.2,
    address: "Sinhagad Road, Pune, Maharashtra",
    propertyType: "Resort",
    distance: 4,
    price: 7800,
    photos: ["https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?auto=format&fit=crop&w=800&q=80"],
    formatted_address: "Sinhagad Road, Pune, Maharashtra"
  }
];
const HotelList = () => {
  const { city } = useParams();
  const { cache, saveHotelsToCache } = useContext(HotelContext)
  // const [showFilters, setShowFilters] = useState(true);
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filters, setFilters] = useState({
    propertyType: "All",
    price: "none",
    maxPrice: 20000,
    rating: "All",
  });
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const observer = useRef();

  const fetchHotels = async (token = null) => {
    try {
      if (!token) setLoading(true);
      else setLoadingMore(true);

      const url = token
        ? `https://travelwindow-backend.onrender.com/api/hotels?pagetoken=${token}`
        : `https://travelwindow-backend.onrender.com/api/hotels?city=${encodeURIComponent(city)}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "INVALID_REQUEST" && token) {
        setTimeout(() => fetchHotels(token), 1000);
        return;
      }

      const mappedHotels = (data.results || []).map((hotel) => ({
        id: hotel.place_id,
        name: hotel.name,
        city,
        rating: hotel.rating || 0,
        address: hotel.formatted_address,
        propertyType: "Hotel",
        distance: hotel.geometry?.location
          ? Math.floor(Math.random() * 10 + 1)
          : null,
        price: Math.floor(Math.random() * 10000) + 1000,
        photos: hotel.photos || [],
        formatted_address: hotel.formatted_address || "",
      }));

      const updatedHotels = token
        ? [...hotels, ...mappedHotels]
        : mappedHotels;

      setHotels(updatedHotels);
      setNextPageToken(data.next_page_token || null);

      // save to cache
      saveHotelsToCache(city, updatedHotels, data.next_page_token || null);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      if (!token) setHotels([]);
    } finally {
      if (!token) setLoading(false);
      else setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (cache[city]) {
      // ✅ Load from cache instead of backend
      setHotels(cache[city].hotels);
      setNextPageToken(cache[city].nextPageToken);
      setLoading(false);
      
    } else {
      fetchHotels();
    }
  }, [city]);

  // IntersectionObserver for infinite scroll
  const lastHotelRef = useCallback(
    (node) => {
      if (loadingMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextPageToken) {
          fetchHotels(nextPageToken);
        }
      });

      if (node) observer.current.observe(node);
    },
    [nextPageToken, loadingMore]
  );

  // Filters
  useEffect(() => {
    let updatedHotels = [...hotels];

    if (filters.propertyType !== "All") {
      updatedHotels = updatedHotels.filter(
        (hotel) => hotel.propertyType === filters.propertyType
      );
    }

    updatedHotels = updatedHotels.filter((hotel) =>
      filters.maxPrice === 20000 ? hotel.price >= 500 : hotel.price <= filters.maxPrice
    );

    if (filters.rating !== "All") {
      updatedHotels = updatedHotels.filter(
        (hotel) => hotel.rating >= Number(filters.rating)
      );
    }

    if (filters.price === "low") updatedHotels.sort((a, b) => a.price - b.price);
    else if (filters.price === "high") updatedHotels.sort((a, b) => b.price - a.price);

    setFilteredHotels(updatedHotels);
  }, [filters, hotels]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center" }}>
      <div  style={{ margin: "10px 10px" }}>
        <SearchBar />
      </div>

      <div style={{ display: "flex", gap: "20px"}}>
        <div  className={`filters-wrapper ${showFilters ? "show" : ""}`} style={{top:"0"}}>
          <Filters onFilterChange={handleFilterChange} />
        </div>
        {/* } */}
        <div  className="nameCard">
          <div style={{display:"flex", alignItems:"center", gap:"30px"}}>
          <h1>{city.toUpperCase()}</h1>
           <h4 className="filterIcon" onClick={toggleFilters}><img style={{width:"20px"}} src={filterIcon} alt="" /> Filters</h4>

          </div>

          <div >
            {loading && <p>Loading hotels...</p>}

            {filteredHotels.map((hotel, index) => {
              if (index === filteredHotels.length - 1) {
                return <HotelCard ref={lastHotelRef} key={hotel.id} hotel={hotel} />;
              } else {
                return <HotelCard key={hotel.id} hotel={hotel} />;
              }
            })}

            {loadingMore && <p style={{ textAlign: "center" }}>Loading more hotels...</p>}
            {!loading && !filteredHotels.length && <p>No hotels found</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelList;



