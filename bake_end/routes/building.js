const express=require('express');
const router=express.Router();

const requireLogin=require('../middelware/requireLogin')
const BuildingController = require('../controllers/buldingController')

router.get('/getBuldings',BuildingController.getBuldings);
router.get('/getBuildingRooms/:buildingID',BuildingController.getBuildingRooms);
router.post('/getBuldingByID/:buildingID',BuildingController.getBuldingByID)
router.post('/addBuilding/',requireLogin,BuildingController.addBuilding)
router.post('/updateBuilding/:buildingID',requireLogin, BuildingController.updateBuilding)
router.post('/deleteBuilding/:buildingID',requireLogin,BuildingController.deleteBuilding)


module.exports = router


// getbuildingsRoom