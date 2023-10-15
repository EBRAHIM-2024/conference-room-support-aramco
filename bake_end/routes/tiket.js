const express=require('express');
const router=express.Router();

// const requireLogin=require('../middelware/requireLogin')
const TiketController = require('../controllers/tiketController')

router.get('/getTikets',TiketController.getTikets);
router.post('/getTiketByID/:tiketID',TiketController.getTiketByID)
router.post('/addTiket',TiketController.addTiket)


module.exports = router