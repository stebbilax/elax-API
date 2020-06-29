const express = require('express');


// Bring in routes
const { register, login, logout } = require('../controllers/auth');

const { protect, authorize } = require('../middleware/auth')

const router = express.Router();

router.route("/register")
    .post(register);

router.route("/login")
    .post(login);

router.route("/logout")
    .post(protect, authorize("admin"), logout);



module.exports = router;