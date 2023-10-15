const express=require('express');
const router=express.Router();

const requireLogin=require('../middelware/requireLogin')
const DepartmentController = require('../controllers/departmentController')

router.get('/getDepartments',requireLogin,DepartmentController.getDepartments);
router.post('/getDepartmentByID',requireLogin,DepartmentController.getDepartmentByID)
router.post('/addDepartment',requireLogin,DepartmentController.addDepartment)
router.post('/updateDepartment',requireLogin, DepartmentController.updateDepartment)
router.post('/deleteDepartment',requireLogin,DepartmentController.deleteDepartment)


module.exports = router