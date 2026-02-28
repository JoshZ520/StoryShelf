const router = require('express').Router();
const passport = require('passport');

/**
 * GET /auth/google/start
 * Initiates Google OAuth login flow
 */
router.get('/google/start',
  /* #swagger.security = [] */
  /* #swagger.tags = ['Authentication']
     #swagger.description = 'Redirects to Google OAuth login page. No authentication required.' */
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

/**
 * GET /auth/google/callback
 * Google OAuth callback endpoint
 */
router.get('/google/callback',
  /* #swagger.security = [] */
  /* #swagger.tags = ['Authentication']
     #swagger.description = 'Google OAuth callback. Handles authentication and creates user session. No authentication required to access this endpoint.' */
  passport.authenticate('google', { failureRedirect: 'https://storyshelf.onrender.com/' }),
  (req, res) => {
    // Successful authentication, redirect to dashboard
    res.redirect('https://storyshelf.onrender.com/dashboard.html');
  }
);

/**
 * GET /auth/logout
 * Logs out the authenticated user
 */
router.get('/logout',
  /* #swagger.security = [] */
  /* #swagger.tags = ['Authentication']
     #swagger.description = 'Logs out the current user and destroys the session.' */
  (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.redirect('https://storyshelf.onrender.com/');
  });
});

/**
 * GET /auth/user
 * Returns the current authenticated user info
 */
router.get('/user',
  /* #swagger.tags = ['Authentication']
     #swagger.description = 'Returns the currently authenticated user information. Requires active session.' */
  (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

module.exports = router;
