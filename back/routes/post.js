// import d'express'
const express = require('express');
const router = express.Router();

// déclaration des routes
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const postCtrl = require('../controllers/post');


//router
router.get('/',auth, postCtrl.getAllPost);
router.post('/',auth,postCtrl.createPost);
/*
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.post('/:id/like', auth, postCtrl.likePost);*/

module.exports = router;