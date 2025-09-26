const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectMongoDb = require("./config/db.js");
const authRoutes = require("./routes/auth");
const passport = require("./config/passport.js");
const Cart = require("./models/Cart.js")

const PORT = process.env.PORT || 8000;
const app = express();

// --- Connect to MongoDB ---
connectMongoDb();

// --- Passport middleware ---
app.use(passport.initialize());

// --- Cookie parser ---
app.use(cookieParser());

// --- CORS middleware ---
app.use(
  cors({
    origin: "*", // your React frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// --- Body parsers ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Routes ---
app.use("/api/auth", authRoutes);

// --- Test route ---
app.get("/", (req, res) => res.send("Server is running..."));


const allowedCities = ["Delhi", "Mumbai", "Rishikesh", "Jaipur", "Goa"];




app.get("/api/hotels", async (req, res) => {
  const { city, pagetoken } = req.query;
  const API_KEY = process.env.GOOGLE_API_KEY;

  if (!API_KEY) return res.status(500).json({ error: "Google API key not set" });
  if (!city && !pagetoken)
    return res.status(400).json({ error: "City parameter or pagetoken is required" });

  let url = "";
  if (pagetoken) {
    url = `https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${pagetoken}&key=${API_KEY}`;
  } else {
    url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=hotels+in+${encodeURIComponent(
      city
    )}&key=${API_KEY}`;
  }

  try {

    let data;

    for (let i = 0; i < 5; i++) {  // try up to 5 times
      const response = await fetch(url);
      data = await response.json();
      console.log(data);



      

      if (data.status === "OK" || data.status === "ZERO_RESULTS") break;
      if (data.status === "INVALID_REQUEST" && pagetoken) {
        // wait 2 sec before retry
        await new Promise(r => setTimeout(r, 1000));
      } else {
        break;
      }
    }

    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      return res.status(502).json({ error: "Google API error", details: data });
    }


    res.json({
      results: data.results,
      next_page_token: data.next_page_token || null,
    });
  } catch (err) {
    console.error("Error fetching hotels:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});




      








app.get("/api/cities", async (req, res) => {
  const query = req.query.query;
  const API_KEY = process.env.GOOGLE_API_KEY;

  if (!query) return res.json([]);
  try {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&types=(cities)&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.status !== "OK") return res.json([]);
    const citySuggestions = data.predictions.map(pred => pred.description);
    res.json(citySuggestions);
  } catch (err) {
    console.error(err);
    res.json([]);
  }
});










app.get("/api/hotel/:id/details", async (req, res) => {
  const API_KEY = process.env.GOOGLE_API_KEY;
  const placeId = req.params.id;

  if (!API_KEY)
    return res.status(500).json({ error: "Google API key not set" });

  // Fetch more fields: rating, address, types, phone, website, opening_hours, etc.
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,formatted_address,geometry,types,opening_hours,photos,formatted_phone_number,website&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    

    if (data.status !== "OK") {
      return res.status(500).json({ error: "Google API error", details: data });
    }

    // Map photo references into URLs
    const photos = (data.result.photos || []).map((photo) => ({
      url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photo.photo_reference}&key=${API_KEY}`,
      attributions: photo.html_attributions,
    }));

    res.json({
      id: placeId,
      name: data.result.name,
      address: data.result.formatted_address,
      rating: data.result.rating,
      user_ratings_total: data.result.user_ratings_total,
      types: data.result.types,
      location: data.result.geometry?.location,
      opening_hours: data.result.opening_hours?.weekday_text || [],
      phone: data.result.formatted_phone_number || "",
      website: data.result.website || "",
      photos,
    });
  } catch (err) {
    console.error("Error fetching hotel details:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});








app.get("/api/cart/:userId", async (req, res) => {
  try {
    const items = await Cart.find({ userId: req.params.userId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add to cart
app.post("/api/cart/add", async (req, res) => {
  const { userId, hotelId } = req.body;
  try {
    const existing = await Cart.findOne({ userId, hotelId });
    if (!existing) {
      await Cart.create({ userId, hotelId });
    }
    const updatedCart = await Cart.find({ userId });
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove from cart
app.delete("/api/cart/remove/:userId/:hotelId", async (req, res) => {
  const { userId, hotelId } = req.params;
  try {
    await Cart.deleteOne({ userId, hotelId });
    const updatedCart = await Cart.find({ userId });
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


