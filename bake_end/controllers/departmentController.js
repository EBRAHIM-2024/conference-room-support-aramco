const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Department = require('../models/department');
// const Department=mongoose.model('Department');

//Show all Departments
const getDepartments= (req, res) =>{
       Department.find()
       .populate('createdBy','_id name')
       .then(Departments=>{
         res.json(Departments);
       })
       .catch(err=>{
        console.log(err);
       })
}
// Get BuldingByID

const getDepartmentByID=(req, res,next) => {
    let departmentID= req.body.departmentID;
    Department.findById(departmentID)
    .then(response => {
     res.json({response})
    })
    .catch(err => {
        res.json({
            message:'error getting Department'
        });
    })
    }


// Create a new Department
const addDepartment=(req, res)=>{
    const{name}=req.body;
    if (!name) {
    return  res.status(422).json({error:"please add all required fields"})
    }
    // req.department.password=undefined;
    const department=new Department({
        name,
        createdBy:req.employee,
    })
    department.save().then(result=>{
        res.json({department:result})
    })
    .catch(err=>{
        console.log(err);
    })
}

// update Department
const updateDepartment=(req, res,next) => {
    let departmentID=req.body.departmentID;
    let updatedData={
        name:req.body.name,
    };
    Department.findByIdAndUpdate(departmentID,{$set:updatedData})
    .then(()=>{
       res.json({
        message: 'Department updated successfully'
       })
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            message: 'Error updating Department'
        })
    })
}

// Delete Department

const deleteDepartment=(req, res,next) => {
    let departmentID=req.body.departmentID;

    Department.findByIdAndRemove(departmentID)
    .then(()=>{
       res.json({
        message: 'Department Deleted successfully'
       })
    })
    .catch((err)=>{
        res.json({
            message: 'Error deleting Department'
        })
    })
}

module.exports={getDepartments,getDepartmentByID,addDepartment,updateDepartment,deleteDepartment}
