const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Building = require('../models/building');
// const Building=mongoose.model('Building');

//Show all buildings
const getBuldings= (req, res) =>{
       Building.find()
       .populate('createdBy','_id name')
       .then(buildings=>{
         res.json(buildings);
       })
       .catch(err=>{
        console.log(err);
       })
}


// Get BuldingByID

const getBuldingByID=(req, res,next) => {
    let buildingID= req.params.buildingID;
    Building.findById({_id:buildingID})
    .then(response => {
     res.json({response})
    })
    .catch(err => {
        res.json({
            message:'error getting Building'
        });
    })
    }

    const getBuildingRooms= (req, res) =>{
        let buildingID= req.params.buildingID;
        Building.find({_id:buildingID})
         .populate('rooms',' _id ')
         .then(rooms=>{
              res.json(rooms);
            })
            .catch(err=>{
             console.log(err);
            })
    }



// Create a new building
const addBuilding=(req, res)=>{
    const{buildingName}=req.body;
    if (!buildingName){
    return  res.status(422).json({error:"please add all required fields"})
    }
    // req.building.password=undefined;
    const building=new Building({
        buildingName,
        // rooms,
        createdBy:req.employee,
    })
    building.save().then(result=>{
        res.json({message:"Building saved  successfully"})
        res.json({building:result})
    })
    .catch(err=>{
        console.log(err);
    })
}

// update building
const updateBuilding=(req, res,next) => {
    let buildingID=req.params.buildingID;
    let updatedData={
        buildingName:req.body.buildingName,
        room:req.body.room
    };
    Building.findByIdAndUpdate({_id:buildingID},{$set:updatedData})
    .then(()=>{
       res.json({
        message: 'building updated successfully'
       })
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            message: 'Error updating building'
        })
    })
}

// Delete building

const deleteBuilding=(req, res,next) => {
    let buildingID=req.params.buildingID;

    Building.findOneAndRemove({_id:buildingID})
    .then(()=>{
       res.json({
        message: 'Building Deleted successfully'
       })
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            message: 'Error Deleting Building'
        })
    })
}


module.exports={getBuldings,getBuldingByID,addBuilding,updateBuilding,deleteBuilding,getBuildingRooms}
