import React, { createContext, useState, useContext } from "react";

export const HotelContext = createContext();

// export const useHotelCache = () => useContext(HotelContext);

export const HotelProvider = ({ children }) => {
  const [cache, setCache] = useState({}); 
  // structure: { cityName: { hotels: [], nextPageToken: "" } }

  const saveHotelsToCache = (city, hotels, nextPageToken) => {
    setCache((prev) => ({
      ...prev,
      [city]: { hotels, nextPageToken },
    }));
  };

  return (
    <HotelContext.Provider value={{ cache, saveHotelsToCache }}>
      {children}
    </HotelContext.Provider>
  );
};
