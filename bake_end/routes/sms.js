const express=require('express');
const router=express.Router();

// const requireLogin=require('../middelware/requireLogin')
const SMSController = require('../controllers/smsController')

router.post('/sendSMS',SMSController.sendSMS);


module.exports = router