// import './Navbar.css';
// import logo from '../assets/bannerimages/mountain.png';
// import { Link, useNavigate } from 'react-router-dom';
// import { useState, useContext, useEffect, useRef } from 'react';
// import userIcon from './user.png';
// import trolley from './trolley.png';
// import { AuthContext } from '../context/AuthContext';
// import { CartContext } from '../context/CartContext'; // 👈 add this




// function Navbar() {
//   const navigate = useNavigate();
//   const { user, setUser,loading } = useContext(AuthContext);
//   const { cartCount } = useContext(CartContext); // 👈 added for cart badge
  
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const dropdownRef = useRef(); // Ref for dropdown
//   const userIconRef = useRef(); // Ref for user icon
//   // console.log("drop",dropdownRef.current);
//   // console.log("user",userIconRef.current);
  

//   const handleLogout = async () => {
//     try {
//       await fetch("https://travelwindow-backend.onrender.com/api/auth/logout", {
//         method: "POST",
//         credentials: "include",
//       });
//       setUser(null);
//       setDropdownOpen(false);
//       navigate('/');
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
    
//     const handleClickOutside = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target) &&
//         userIconRef.current 
//         && !userIconRef.current.contains(event.target)
//       ) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <nav className="nav_bar">
//       {/* Logo */}
//       <div className="logo">
//         <Link to="/">
//           <img src={logo} alt="logo" style={{ width: "50px", filter: "invert(1)" }} />
//         </Link>
//       </div>

//       {/* Nav Links */}
//       <div className="anchor">
//         <Link to="/">Home</Link>
//         <Link to="/about">About</Link>
//         <Link to="/contact">Contact</Link>
//         <Link style={{ backgroundColor: "black", padding: "5px 10px", borderRadius: "10px" }} to="/bookings">Bookings</Link>
//       </div>

//       {/* Right-side icons */}
//       <div style={{ display: "flex", alignItems: "center", gap: "15px", marginRight: "20px" }}>
//         {/* Auth Section */}
//         <div style={{ position: "relative" }}>
//           if (loading) return <div>Loading...</div>;
//           {user ? (
//             <>
//               <img
//                 src={userIcon}
//                 alt="user"
//                 ref={userIconRef}
//                 style={{ width: 40, filter: "invert(1)", borderRadius: "50%", cursor: "pointer" }}
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//               />
//               {dropdownOpen && (
//                 <div className="dropdown" ref={dropdownRef}>
//                   <p className="dropdown-item">{user.name}</p>
//                   <p className="dropdown-item">{user.email}</p>
//                    <button className="dropdown-item" onClick={()=>navigate('/bookings')}>Bookings</button>
//                   <button style={{backgroundColor:"black", color:"white"}} className="dropdown-item" onClick={handleLogout}>Logout</button>
                  
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="auth_buttons">
//               <button onClick={() => navigate('/login')} className="login_btn">Login</button>
//               <button onClick={() => navigate('/signup')} className="register_btn">Signup</button>
//             </div>
//           )}
//         </div>

//         {/* Cart Icon */}
//         <div>
//           <Link to="/cart">
//           <img src={trolley} className="cart-icon" alt="cart" />
//           </Link>
//         </div>
//         <div style={{ position: "relative" }}> {/* added relative for badge */}


//   {/* Badge */}
//   {cartCount > 0 && (
//     <span
//       style={{
//         position: "absolute",
//         top: "-5px",
//         right: "-5px",
//         background: "red",
//         color: "white",
//         borderRadius: "50%",
//         width: "18px",
//         height: "18px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         fontSize: "12px",
//         fontWeight: "bold",
//       }}
//     >
//       {cartCount}
//     </span>
//   )}
// </div>

//       </div>
//     </nav>
//   );
// }

// export default Navbar;




import './Navbar.css';
import logo from '../assets/bannerimages/mountain.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect, useRef } from 'react';
import userIcon from './user.png';
import trolley from './trolley.png';
import lineIcon from './triple.png'
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';



function Navbar() {
  const navigate = useNavigate();
  const { user, setUser, loading } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const [navtoggle,setNavToggle]=useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const userIconRef = useRef();

  const handleLogout = async () => {
    try {
      await fetch("https://travelwindow-backend.onrender.com/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      setDropdownOpen(false);
      navigate('/');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        userIconRef.current &&
        !userIconRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Loading check before JSX
  if (loading) return <div>Loading...</div>;

  const changeToggleNav=()=>{
   setNavToggle((prev) => !prev);

  }

  return (
    <nav className="nav_bar">
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" style={{ width: "50px", filter: "invert(1)" }} />
        </Link>
      </div>

      {/* Nav Links */}
      <div style={{}} className={`${navtoggle ? "tripleshow" : "triplehide"}`}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/bookings">Bookings</Link>
      </div>

      {/* Right-side icons */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px", marginRight: "5px" }}>
        {/* Auth Section */}
        <div style={{ position: "relative" }}>
          {user ? (
            <>
              <img
                src={userIcon}
                alt="user"
                ref={userIconRef}
                style={{ width: 40, filter: "invert(1)", borderRadius: "50%", cursor: "pointer" }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="dropdown" ref={dropdownRef}>
                  <p className="dropdown-item">{user.name}</p>
                  <p className="dropdown-item">{user.email}</p>
                  <button className="dropdown-item" onClick={() => navigate('/bookings')}>Bookings</button>
                  <button style={{ backgroundColor: "black", color: "white" }} className="dropdown-item" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </>
          ) : (
            <div className="auth_buttons">
              <button onClick={() => navigate('/login')} className="login_btn">Login</button>
              <button onClick={() => navigate('/signup')} className="register_btn">Signup</button>
            </div>
          )}
        </div>

        {/* Cart Icon */}
        <div>
          <Link to="/cart">
            <img src={trolley} className="cart-icon" alt="cart" />
          </Link>
        </div>
        <div style={{ position: "relative" }}>
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-10px",
                right: "50px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                width: "18px",
                height: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "bold",
                zIndex:"-1000000"
              }}
              className='cartCount'
            >
              {cartCount}
            </span>
            
          )}
          <div onClick={changeToggleNav} >
          <img style={{cursor:"pointer"}} className='triple' src={lineIcon} alt="" />
        </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;


