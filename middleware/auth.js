/**
 * Authentication Middleware
 * Ensures user is authenticated via OAuth before accessing protected routes
 */

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ 
    error: 'Authentication required. Please login with Google.' 
  });
};

module.exports = { isAuthenticated };
