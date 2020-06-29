const express = require('express');
const Blogpost = require('../models/Blogpost');


// Bring in controllers
const { getBlogposts, getBlogpost, createBlogpost, deleteBlogpost } = require('../controllers/blogposts');

const { protect, authorize } = require('../middleware/auth')


const router = express.Router();

router.route("/")
    .get(getBlogposts)
    .post(protect, authorize("admin"), createBlogpost);

router.route("/:id")
    .get(getBlogpost)
    .delete(protect, authorize("admin"), deleteBlogpost);



module.exports = router;

