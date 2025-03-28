// Middleware to restrict access to private routes
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  /* 
    Users can pass the access token under:
    - The "Authorization" header with the value "Bearer <token>"
  */
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1]; // Extract token after "Bearer"

    if (!token) {
      res.status(401);
      throw new Error("User not authorized or missing token");
    }

    // Verify token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }

      req.user = decoded.user; // Store decoded user info in request object
      next(); // Proceed to next middleware
    });
  } else {
    res.status(401);
    throw new Error("Authorization header missing");
  }
});

module.exports = validateToken;
