// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

// // 🔹 Signup controller
// exports.signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // 1. Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "User already exists Please Directly Login" });
//     }

//     // 2. Create new user (password is hashed in schema)
//     const newUser = new User({ name, email, password });
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// // 🔹 Login controller
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // 1. Find user
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ error: "User not found" });

//     // 2. Compare password
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) return res.status(400).json({ error: "Invalid password" });

//     // 3. Generate JWT
//     const token = jwt.sign(
//       { id: user._id, email: user.email, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );


//     res.cookie("token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     maxAge: 3600000, // 1 hour
//     });


//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };


// // 🔹 Logout controller
// exports.logout = (req, res) => {
//   res.clearCookie("token");
//   res.json({ message: "Logged out successfully" });
// };



// // Get logged-in user
// exports.getMe = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// };









const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Helper to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// 🔹 Signup controller
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists. Please login directly." });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// 🔹 Login controller (local login via Passport)
exports.login = (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });

  const token = generateToken(req.user);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 3600000,
  });

  res.json({ message: "Login successful", user: req.user, token });
};

// 🔹 Social login callback (Google/Facebook)
exports.socialLoginCallback = async (req, res) => {
  try {
    const user = req.user; // passport gives user here

    // Generate JWT
    // const token = jwt.sign(
    //   { id: user._id, email: user.email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" }
    // );
    const token = generateToken(req.user);

    // Send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 3600000,
    });

    // Redirect to frontend after login
    res.redirect("https://travelwindow.vercel.app/"); // frontend home/dashboard
  } catch (err) {
    console.error(err);
    res.redirect("https://travelwindow.vercel.app/login?error=OAuthFailed");
  }
};


// 🔹 Logout controller
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

// 🔹 Get logged-in user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

