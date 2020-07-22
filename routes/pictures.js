const express = require('express');
const Picture = require('../models/Picture');



// Bring in controllers
const { getPictures, getPicture, createPicture, editPicture, deletePicture } = require('../controllers/pictures');


const { protect, authorize } = require('../middleware/auth')



const router = express.Router({ mergeParams: true });

router.route("/")
    .get(getPictures)
    .post(createPicture);


router.route("/:id")
    .get(getPicture)
    .patch(protect, authorize('admin'), editPicture)
    .delete(protect, authorize('admin'), deletePicture);





module.exports = router;