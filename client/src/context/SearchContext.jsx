import { createContext, useEffect, useState } from "react";


export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [city, setCity] = useState("");
  const [people, setPeople] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  // Check if user is logged in on app load
  
  return (
    <SearchContext.Provider value={{city,setCity,people,setPeople,checkIn,setCheckIn,checkOut,setCheckOut }}>
      {children}
    </SearchContext.Provider>
  );
};
