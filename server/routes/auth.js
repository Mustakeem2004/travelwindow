const express = require("express");
const router = express.Router();
const passport = require("../config/passport"); // your passport strategies
const authController = require("../controllers/authController");
const authmiddleware = require("../middleware/authmiddleware.js");

// Signup endpoint
router.post("/signup", authController.signup);

// Local login
router.post("/login", passport.authenticate("local", { session: false }), authController.login);

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/login", session: false }),
  authController.socialLoginCallback
);

// Facebook OAuth
// router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
// router.get("/facebook/callback", passport.authenticate("facebook", { session: false }), authController.socialLoginCallback);

// Logout
router.post("/logout", authController.logout);

// Get logged-in user
router.get("/me", authmiddleware, authController.getMe);

module.exports = router;

