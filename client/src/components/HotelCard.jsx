
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import starRating from "../assets/star.png";

// const HotelCard = ({ hotel }) => {
//   const navigate = useNavigate();

//   if (!hotel) return null; // safety check

//   const hotelImage =
//     hotel.photos && hotel.photos.length > 0
//       ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${hotel.photos[0].photo_reference}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
//       : "https://via.placeholder.com/400x250?text=No+Image";

//   return (
//     <div
//       style={{
//         border: "1px solid #ddd",
//         borderRadius: "10px",
//         marginBottom: "20px",
//         padding: "15px",
//         display: "flex",
//         gap: "15px",
//         width: "100%",
//       }}
//     >
//       <img
//         src={hotelImage}
//         alt={hotel.name}
//         style={{ width: "300px",maxHeight:"300px", borderRadius: "10px", objectFit: "cover" }}
//       />
//       <div style={{width:"400px"}}>
//         <h2 style={{padding:"0px",margin:"0px"}}>{hotel.name || "No Name"}</h2>
//         <p style={{padding:"0px",margin:"0px"}}>
//           {hotel.formatted_address}
//           {/* {hotel.city || hotel.formatted_address || "Unknown City"}{" "}
//           {hotel.distance ? `• ${hotel.distance} km from centre` : ""} */}
//         </p>
//         <p>
//           <strong>₹{hotel.price || Math.floor(Math.random() * 10000 + 1000)}</strong>{" "}
//           / night
//         </p>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             width: "100%",
//           }}
//         >
//           <button
//             onClick={() =>
//               navigate(`/hotels/${hotel.city?.toLowerCase() || "city"}/${hotel.id}`)
//             }
//             style={{
//               backgroundColor: "#0071c2",
//               color: "white",
//               border: "none",
//               padding: "10px",
//               height: "35px",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//           >
//             See availability
//           </button>
//           <div
//             style={{
//               backgroundColor: "green",
//               padding: "0px 5px",
//               borderRadius: "5px",
//               color: "white",
//               display: "flex",
//               alignItems: "center",
//               gap: "2px",
//             }}
//           >
//             <p style={{ margin: 0, fontSize: "12px", padding: "5px 2px" }}>
//               {hotel.rating || "N/A"}
//             </p>
//             <img
//               style={{ height: "10px", filter: "invert(1)" }}
//               src={starRating}
//               alt="star"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotelCard;




import React, { forwardRef,useState } from "react";
import { useNavigate } from "react-router-dom";
import starRating from "../assets/star.png";

const HotelCard = forwardRef(({ hotel }, ref) => {
  
  const navigate = useNavigate();
  
  
  

  if (!hotel) return null;


  
  const [imgSrc, setImgSrc] = useState(
 
    hotel.photos && hotel.photos.length  > 0 
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${hotel.photos[0].photo_reference}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
      : "https://via.placeholder.com/400x250?text=No+Image"
  );



   const handleError = () => {
    if (hotel.photos && hotel.photos.length > 0) {
      setImgSrc(hotel.photos[0].url); // fallback to backend-provided URL
    } 
    else {
      setImgSrc("https://via.placeholder.com/400x250?text=No+Image");
    }
  };      
     



    



  return (
    <div
      ref={ref}
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        marginBottom: "20px",
        padding: "15px",
        display: "flex",
        gap: "15px",
        width: "100%",
      }}
    >
      <img
        src={imgSrc }
        alt={hotel.name}

        style={{ width: "300px", maxHeight: "300px", borderRadius: "10px", objectFit: "cover" }}
        onError={handleError} // fallback if first URL fails
      />
      <div style={{ width: "400px" }}>
        <h2 style={{ padding: "0px", margin: "0px" }}>{hotel.name || "No Name"}</h2>
        <p style={{ padding: "0px", margin: "0px" }}>{hotel.formatted_address}</p>
        <p>
          <strong>₹{hotel.price || Math.floor(Math.random() * 10000 + 1000)}</strong> / night
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <button
            onClick={() =>
              navigate(`/hotels/${hotel.city?.toLowerCase() || "city"}/${hotel.id}`)
            }
            style={{
              backgroundColor: "#0071c2",
              color: "white",
              border: "none",
              padding: "10px",
              height: "35px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            See availability
          </button>
          <div
            style={{
              backgroundColor: "green",
              padding: "0px 5px",
              borderRadius: "5px",
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "2px",
            }}
          >
            <p style={{ margin: 0, fontSize: "12px", padding: "5px 2px" }}>
              {hotel.rating || "N/A"}
            </p>
            <img
              style={{ height: "10px", filter: "invert(1)" }}
              src={starRating}
              alt="star"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default HotelCard;

