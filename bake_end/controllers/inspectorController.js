const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Isnpector = require('../models/inspector');
const Inspector = require('../models/inspector');
// const Isnpector=mongoose.model('Isnpector');

//Show all Isnpectors
const getIsnpectors= (req, res) =>{
       Isnpector.find()
       .populate('createdBy','_id name')
       .then(Isnpectors=>{
         res.json(Isnpectors);
       })
       .catch(err=>{
        console.log(err);
       })
}


// Get BuldingByID

const getIsnpectorByID=(req, res,next) => {
    let isnpectorID= req.params.isnpectorID;
    Isnpector.findById({_id:isnpectorID})
    .then(response => {
     res.json({response})
    })
    .catch(err => {
        res.json({
            message:'error getting Isnpector'
        });
    })
    }



// Create a new Isnpector
const addIsnpector=(req, res)=>{
    const{inspector,phoneNumber,email}=req.body;
    if (!inspector||!phoneNumber||!email) {
    return  res.status(422).json({error:"please add all required fields"})
    }
    // req.Isnpector.password=undefined;
    const Isnpector=new Inspector({
        inspector,
        phoneNumber,
        email,
        createdBy:req.employee,
    })
    Isnpector.save().then(result=>{
        res.json({message:"Isnpector saved  successfully"})
        res.json({Isnpector:result})
    })
    .catch(err=>{
        console.log(err);
    })
}

// update Isnpector
const updateIsnpector=(req, res,next) => {
    let isnpectorID=req.params.isnpectorID;
    let updatedData={
        inspector:req.body.inspector,
        phoneNumber:req.body.room,
        email:req.body.email
    };
    Isnpector.findByIdAndUpdate({_id:isnpectorID},{$set:updatedData})
    .then(()=>{
       res.json({
        message: 'Isnpector updated successfully'
       })
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            message: 'Error updating Isnpector'
        })
    })
}

// Delete Isnpector

const deleteIsnpector=(req, res,next) => {
    let isnpectorID=req.params.isnpectorID;

    Isnpector.findOneAndRemove({_id:isnpectorID})
    .then(()=>{
       res.json({
        message: 'Isnpector Deleted successfully'
       })
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            message: 'Error Deleting Isnpector'
        })
    })
}


module.exports={getIsnpectors,getIsnpectorByID,addIsnpector,updateIsnpector,deleteIsnpector}
