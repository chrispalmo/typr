const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const requireLogin = require("../middlewares/requireLogin")
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load User model
const User = require("../models/User");

module.exports = app => {
  // @route POST api/users/register
  // @desc Register user
  // @access Public
  app.post("/api/user/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
      // Check validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          return res.status(400).json({ email: "Email already exists" });
        } else {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email.toLowerCase(),
            password: req.body.password
          });
          // Hash password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
        }
      });
    });
  // @route POST api/users/login
  // @desc Login user and return JWT token
  // @access Public
  app.post("/api/user/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    	// Check validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const email = req.body.email.toLowerCase();
      const password = req.body.password;
    	// Find user by email
      User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
          return res.status(404).json({ emailnotfound: "Email not found" });
        }
    		// Check password
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
              id: user.id,
              name: user.name,
              email: user.email,
              date: user.date,
              newsDigest: user.newsDigest
            };
    				// Sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 60*60*8 // 8 hours in seconds
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            return res
              .status(400)
              .json({ passwordincorrect: "Password incorrect" });
          }
        });
      });
  });
  // @route GET api/user/current_user
  // @desc Return current user
  // @access Private
  app.get("/api/user/current_user", requireLogin, async (req, res) => {
    const user = await User.findOne({ _id: req.decoded.id });
    user.password = null
    res.send(user)
  });
  // @route POST /api/current_user/news_digest/selected_sources
  // @desc Update current user's selected sources and return (sorted) selected sources
  // @access Private
  app.post("/api/current_user/news_digest/selected_sources", requireLogin, async (req, res) => {
     user = await User.findOne({ _id: req.decoded.id })
     user.newsDigest.selectedSources = req.body.sort()
     updatedUser = await user.save()
     res.send(updatedUser.newsDigest.selectedSources)
  });
  //
};
