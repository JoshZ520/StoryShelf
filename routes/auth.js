const router = require('express').Router();
const passport = require('passport');

/**
 * GET /auth/google/start
 * Initiates Google OAuth login flow
 */
router.get('/google/start', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

/**
 * GET /auth/google/callback
 * Google OAuth callback endpoint
 */
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home or dashboard
    res.redirect('/dashboard.html');
  }
);

/**
 * GET /auth/logout
 * Logs out the authenticated user
 */
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.redirect('/');
  });
});

/**
 * GET /auth/user
 * Returns the current authenticated user info
 */
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

module.exports = router;
