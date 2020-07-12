const express = require('express');
const Picture = require('../models/Picture');



// Bring in controllers
const { getPictures, getPicture, createPicture } = require('../controllers/pictures');


const { protect, authorize } = require('../middleware/auth')



const router = express.Router({ mergeParams: true });

router.route("/")
    .get(getPictures)
    .post(createPicture);


router.route("/:id")
    .get(getPicture);




module.exports = router;