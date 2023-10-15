const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Room = require('../models/conference_room');
// const room=mongoose.model('room');

//Show all rooms
const getRooms= (req, res) =>{
       Room.find()
       .populate('createdBy building inspector employee','_id name buildingName inspector employeeName')
       .then(rooms=>{
         res.json(rooms);
       })
       .catch(err=>{
        console.log(err);
       })
}
// Get RoomByID

const getRoomByID=(req, res,next) => {
    let roomID= req.params.roomID;
    Room.findById({_id:roomID})
    .populate('createdBy building inspector employee','_id name buildingName inspector employeeName phoneNumber')
    .then(response => {
     res.json({response})
    })
    .catch(err => {
        res.json({
            message:'Error Getting Room'
        });
    })
    }

    const getRoomsBulding= (req, res) =>{
        let roomID= req.params.roomID;
        Room.find({_id:roomID})
        .populate('createdBy building inspector employee','_id name buildingName inspector employeeName')
         .then(rooms=>{
              res.json(rooms);
            })
            .catch(err=>{
             console.log(err);
            })
    }


// Create a new room
const addRoom=(req, res)=>{
    const{roomName,building,employee,inspector}=req.body;
    if (!roomName||!building||!employee||!inspector) {
    return  res.status(422).json({error:"please add all required fields"})
    }
    // req.room.password=undefined;
    const room=new Room({
        roomName,
        building,
        employee,
        inspector,
        createdBy:req.employee,
    })
    room.save().then(result=>{
        res.json({message:"Room saved  successfully"})
        res.json({room:result})
    })
    .catch(err=>{
        console.log(err);
    })
}

// update room
const updateRoom=(req, res,next) => {
    let roomID=req.params.roomID;
    let updatedData={
        roomName:req.body.roomName,
    };
    Room.findByIdAndUpdate({_id:roomID},{$set:updatedData})
    .then(()=>{
       res.json({
        message: 'room updated successfully'
       })
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            message: 'Error updating room'
        })
    })
}

// Delete room


const deleteRoom=(req, res,next) => {
    let roomID=req.params.roomID;
    Room.findOneAndRemove({_id:roomID})
    .then(()=>{
       res.json({
        message: 'Room Deleted Successfully'
       })
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            message: 'Error Deleting Room'
        })
    })
}

module.exports={getRooms,getRoomsBulding,getRoomByID,addRoom,updateRoom,deleteRoom}
