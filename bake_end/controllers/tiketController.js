const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Tiket = require('../models/tiket');
// const room=mongoose.model('room');

//Show all rooms
const getTikets= (req, res) =>{
       Tiket.find()
       .then(tikets=>{
         res.json(tikets);
       })
       .catch(err=>{
        console.log(err);
       })
}
// Get RoomByID

const getTiketByID=(req, res,next) => {
    let tiketID= req.params.tiketID;
    Tiket.findById({_id:tiketID})
    .then(response => {
     res.json({response})
    })
    .catch(err => {
        res.json({
            message:'Error Getting Tiket'
        });
    })
    }
// Create a new Tiket
const addTiket=(req, res)=>{
    const{name,email,phoneNumber,building,room,problem,employee,inspector}=req.body;
    if (!name||!email||!phoneNumber||!building||!room||!problem||!employee||!inspector) {
    return  res.status(422).json({error:"please add all required fields"})
    }
    // req.room.password=undefined;
    const tiket=new Tiket({
        name,
        email,
        phoneNumber,
        building,
        room,
        problem,
        employee,
        inspector
    })
    tiket.save().then(result=>{
        res.json({message:"Tiket Created successfully"})
        res.json({tiket:result})
    })
    .catch(err=>{
        console.log(err);
    })
}

const deleteTiket=(req, res,next) => {
    let tiketID=req.params.tiketID;
    Tiket.findOneAndRemove({_id:tiketID})
    .then(()=>{
       res.json({
        message: 'Tiket Deleted Successfully'
       })
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            message: 'Error Deleting Tiket'
        })
    })
}

module.exports={getTikets,getTiketByID,addTiket,deleteTiket}
