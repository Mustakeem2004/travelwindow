
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useParams } from "react-router-dom";
// import Filters from "./Filters";
// import HotelCard from "./HotelCard";
// import SearchBar from "./SearchBar";

// const HotelList = () => {
//   const { city } = useParams();
//   const [hotels, setHotels] = useState([]);
//   const [filteredHotels, setFilteredHotels] = useState([]);
//   const [filters, setFilters] = useState({
//     propertyType: "All",
//     price: "none",
//     maxPrice: 20000,
//     rating: "All",
//   });
//   const [loading, setLoading] = useState(true);
//   const [nextPageToken, setNextPageToken] = useState(null);
//   const [loadingMore, setLoadingMore] = useState(false);

//   const observer = useRef();

//   const fetchHotels = async (token = null) => {
    

//     try {
//       if (!token) setLoading(true);
//       else setLoadingMore(true);

//       const url = token
//         ? `http://localhost:8000/api/hotels?pagetoken=${token}`
//         : `http://localhost:8000/api/hotels?city=${encodeURIComponent(city)}`;

//       const response = await fetch(url);
//       const data = await response.json();
      

//       // Google Places next_page_token requires 2-5s delay before it works
//       if (data.status === "INVALID_REQUEST" && token) {
//         setTimeout(() => fetchHotels(token), 1000);
//         return;
//       }

//       const mappedHotels = (data.results || []).map((hotel) => ({
//         id: hotel.place_id,
//         name: hotel.name,
//         city: city,
//         rating: hotel.rating || 0,
//         address: hotel.formatted_address,
//         propertyType: "Hotel",
//         distance: hotel.geometry?.location ? Math.floor(Math.random() * 10 + 1) : null,
//         price: Math.floor(Math.random() * 10000) + 1000,
//         photos: hotel.photos || [],
//         formatted_address: hotel.formatted_address || "",
//       }));

//       setHotels((prev) => (token ? [...prev, ...mappedHotels] : mappedHotels));
//       setNextPageToken(data.next_page_token || null);
//     } catch (error) {
//       console.error("Error fetching hotels:", error);
//       if (!token) setHotels([]);
//     } finally {
//       if (!token) setLoading(false);
//       else setLoadingMore(false);
//     }
//   };

//   useEffect(() => {
//     setHotels([]);
//     fetchHotels();
//   }, [city]);

//   // IntersectionObserver for infinite scroll
//   const lastHotelRef = useCallback(
//     (node) => {
//       if (loadingMore) return;
//       if (observer.current) observer.current.disconnect();

//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && nextPageToken) {
//           fetchHotels(nextPageToken);
//         }
//       });

//       if (node) observer.current.observe(node);
//     },
//     [nextPageToken, loadingMore]
//   );

//   // Filters
//   useEffect(() => {
//     let updatedHotels = [...hotels];

//     if (filters.propertyType !== "All") {
//       updatedHotels = updatedHotels.filter(
//         (hotel) => hotel.propertyType === filters.propertyType
//       );
//     }

//     updatedHotels = updatedHotels.filter((hotel) =>
//       filters.maxPrice === 20000 ? hotel.price >= 500 : hotel.price <= filters.maxPrice
//     );

//     if (filters.rating !== "All") {
//       updatedHotels = updatedHotels.filter(
//         (hotel) => hotel.rating >= Number(filters.rating)
//       );
//     }

//     if (filters.price === "low") updatedHotels.sort((a, b) => a.price - b.price);
//     else if (filters.price === "high") updatedHotels.sort((a, b) => b.price - a.price);

//     setFilteredHotels(updatedHotels);
//   }, [filters, hotels]);

//   const handleFilterChange = (newFilters) => {
//     setFilters((prev) => ({ ...prev, ...newFilters }));
//   };

//   return (
//     <div style={{ marginLeft: "170px" }}>
//       <div style={{ margin: "10px 0px" }}>
//         <SearchBar />
//       </div>

//       <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
//         <div style={{ top: "87px" }}>
//           <Filters onFilterChange={handleFilterChange} />
//         </div>

//         <div>
//           <h1>{city.toUpperCase()}</h1>
//           <div style={{ width: "700px" }}>
//             {loading && <p>Loading hotels...</p>}

//             {filteredHotels.map((hotel, index) => {
//               if (index === filteredHotels.length - 1) {
//                 return <HotelCard ref={lastHotelRef} key={hotel.id} hotel={hotel} />;
//               } else {
//                 return <HotelCard key={hotel.id} hotel={hotel} />;
//               }
//             })}

//             {loadingMore && <p style={{ textAlign: "center" }}>Loading more hotels...</p>}
//             {!loading && !filteredHotels.length && <p>No hotels found</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotelList;












import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import Filters from "./Filters";
import HotelCard from "./HotelCard";
import SearchBar from "./SearchBar";
import { useContext } from "react";
import { HotelContext } from "../context/HotelContext"; // import context

const HotelList = () => {
  const { city } = useParams();
  const { cache, saveHotelsToCache } = useContext(HotelContext)

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

  const observer = useRef();

  const fetchHotels = async (token = null) => {
    try {
      if (!token) setLoading(true);
      else setLoadingMore(true);

      const url = token
        ? `http://localhost:8000/api/hotels?pagetoken=${token}`
        : `http://localhost:8000/api/hotels?city=${encodeURIComponent(city)}`;

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
    <div style={{ marginLeft: "170px" }}>
      <div style={{ margin: "10px 0px" }}>
        <SearchBar />
      </div>

      <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
        <div style={{ top: "87px" }}>
          <Filters onFilterChange={handleFilterChange} />
        </div>

        <div>
          <h1>{city.toUpperCase()}</h1>
          <div style={{ width: "700px" }}>
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



