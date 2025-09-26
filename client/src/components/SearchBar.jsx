// import './SearchBar.css';
// import { useState, useContext } from 'react';
// import { useNavigate } from "react-router-dom";
// import {cities} from './UkCities.js'
// import { SearchContext } from '../context/SearchContext.jsx';


// function SearchBar() {
//   const cities=["Nainital","Rishikesh","Dehradun","Bhimatal","Mussorie","Jim Corbett"];
//   const {city,setCity,people,setPeople,checkIn,setCheckIn,checkOut,setCheckOut}=useContext(SearchContext);
//   const navigate = useNavigate();
  
// //   const [city, setCity] = useState("");
// //   const [people, setPeople] = useState(0);
//   const [showSuggestions, setShowSuggestions] = useState(false);
// //   const [checkIn, setCheckIn] = useState("");
// //   const [checkOut, setCheckOut] = useState("");

//   // Example cities
//   // const cities = ["Dehradun", "Rishikesh", "Nainital", "Mussoorie", "Kedarnath", "Jim Corbett", "Ramnagar"];

//   // Filter suggestions
//   const filteredCities = cities.filter((c) =>
//     c.toLowerCase().includes(city.toLowerCase())
//   );

//   const handleChangeCity = (e) => {
//     setCity(e.target.value);
//     setShowSuggestions(true);
//   };

//   const handleSelectCity = (cityName) => {
//     setCity(cityName);
//     setShowSuggestions(false);
//   };

//   const handleChangePeople = (e) => {
//     setPeople(e.target.value);
//   };

//   const handleExplore = () => {
//     if (city ) {
//       navigate(`/hotels/${city.toLowerCase()}`);
//     } else {
//       alert("Please enter city");
//     }
//   };

//   // Get today's date in YYYY-MM-DD format
//   const today = new Date().toISOString().split("T")[0];

//   return (
//     <>
//       <div>
        

//         {/* Search Section */}
//         <div className="input_container">

//           {/* 🔹 Search bar with suggestions */}
//           <div className="card" style={{ position: "relative" }}>
//             <h4 >Location <i  className="bi bi-caret-down-fill" ></i></h4>
//             <input
//               type="text"
//               value={city}
//               onChange={handleChangeCity}
//               placeholder="Enter city..."
//               // onFocus={() => setShowSuggestions(true)}
//               // onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} 
//             />

//             {/* Suggestions BELOW search bar */}
//             {showSuggestions && city && (
//               <ul
//                 style={{
//                   border: "1px solid black",
//                 //   marginTop: "5px",
//                   background: "black",
//                   color: "white",
//                   position: "absolute",
//                   top: "100%",
//                   left: 0,
//                   right: 0,
//                   zIndex: 1000000000000,
//                   padding: 0,
//                   borderRadius: "5px",
//                   maxHeight: "200px",
//                   overflowY: "auto",
                  
//                 }}
//               >
//                 {filteredCities.length > 0 ? (
//                   filteredCities.map((c, index) => (
//                     <li
//                       key={index}
//                       onClick={() => handleSelectCity(c)}
//                       style={{
//                         cursor: "pointer",
//                         padding: "8px",
//                         listStyle: "none",
//                         // borderBottom: "0.3px solid #eee"
//                       }}
//                     >
//                       {c}
//                     </li>
//                   ))
//                 ) : (
//                   <li style={{ listStyle: "none", padding: "8px" }}>
//                     No results found
//                   </li>
//                 )}
//               </ul>
//             )}
//           </div>

//           {/* 🔹 Check-in date */}
//           <div className="card">
//             <h4>Check-in <i className="bi bi-caret-down-fill" ></i></h4>
//             <input 
//               type="date" 
//               value={checkIn}
//               onChange={(e) => setCheckIn(e.target.value)}
//               min={today} 
//             />
//           </div>

//           {/* 🔹 Check-out date */}
//           <div className="card">
//             <h4>Check-out <i className="bi bi-caret-down-fill"></i></h4>
//             <input 
//               type="date" 
//               value={checkOut}
//               onChange={(e) => setCheckOut(e.target.value)}
//               min={checkIn || today} // checkout can't be before check-in
//             />
//           </div>

//           {/* 🔹 Guests */}
//           <div className="card">
//             <h4>Guests <i className="bi bi-caret-down-fill"></i></h4>
//             <input 
//               onChange={handleChangePeople} 
//               type="number" 
//               value={people}
//               placeholder="How many people" 
//               min="1" 
//             />
//           </div>

//           {/* 🔹 Explore button */}
//           <button className="explore_btn" onClick={handleExplore}>
//             Explore Now
//           </button>

//         </div>
//       </div>
//     </>
//   );
// }

// export default SearchBar;





import './SearchBar.css';
import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { SearchContext } from '../context/SearchContext.jsx';

function SearchBar() {
  const { city, setCity, people, setPeople, checkIn, setCheckIn, checkOut, setCheckOut } = useContext(SearchContext);
  const navigate = useNavigate();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch city/hotel suggestions from backend
  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`https://github.com/Mustakeem2004/travelwindow/api/cities?query=${encodeURIComponent(input)}`);
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setSuggestions([]);
    }
    finally {
    setLoading(false); // stop loading
  }
  };

  const handleChangeCity = (e) => {
    const value = e.target.value;
    setCity(value);
    setShowSuggestions(true);
    fetchSuggestions(value); // 🔹 Call API for live suggestions
  };

  const handleSelectCity = (cityName) => {
    setCity(cityName);
    setShowSuggestions(false);
  };

  const handleChangePeople = (e) => {
    setPeople(e.target.value);
  };

  const handleExplore = () => {
    if (city) {
      navigate(`/hotels/${encodeURIComponent(city.toLowerCase())}`);
    } else {
      alert("Please enter a city or hotel name");
    }
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <div>
        <div className="input_container">
          

          {/* 🔹 Location */}
          <div className="card" style={{ position: "relative" }}>
            <h4>
              Location <i className="bi bi-caret-down-fill"></i>
            </h4>
            <input
              type="text"
              value={city}
              onChange={handleChangeCity}
              placeholder="Enter city or hotel..."
            />

            {/* Suggestions */}
            {showSuggestions && city && (
  <ul
    style={{
      border: "1px solid black",
      background: "black",
      color: "white",
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: 0,
      borderRadius: "5px",
      maxHeight: "200px",
      overflowY: "auto",
    }}
  >
    {loading ? (
      // <li style={{ listStyle: "none", padding: "8px" }}></li>
      null
    ) : suggestions.length > 0 ? (
      suggestions.map((c, index) => (
        <li
          key={index}
          onClick={() => handleSelectCity(c)}
          style={{
            cursor: "pointer",
            padding: "8px",
            listStyle: "none",
          }}
        >
          {c}
        </li>
      ))
    ) : (
      <li style={{ listStyle: "none", padding: "8px" }}>
        No results found
      </li>
    )}
  </ul>
)}
          </div>

          {/* 🔹 Check-in date */}
          <div className="card">
            <h4>Check-in <i className="bi bi-caret-down-fill"></i></h4>
            <input 
              type="date" 
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={today} 
            />
          </div>

          {/* 🔹 Check-out date */}
          <div className="card">
            <h4>Check-out <i className="bi bi-caret-down-fill"></i></h4>
            <input 
              type="date" 
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || today}
            />
          </div>

          {/* 🔹 Guests */}
          <div className="card">
            <h4>Guests <i className="bi bi-caret-down-fill"></i></h4>
            <input 
              onChange={handleChangePeople} 
              type="number" 
              value={people}
              placeholder="How many people" 
              min="1" 
            />
          </div>

          {/* 🔹 Explore button */}
          <button className="explore_btn" onClick={handleExplore}>
            Explore Now
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchBar;





