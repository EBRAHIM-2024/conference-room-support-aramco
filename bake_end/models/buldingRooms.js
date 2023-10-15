const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const {ObjectId}=mongoose.Schema.Types
timestamps = require('mongoose-timestamp')

const buildingRoomsSchema= new Schema({
    building:{type:ObjectId,ref:'Building'},
    isDeleted:{type:Boolean,default:false},
},
{ timestamps: true }
)

 const Building=mongoose.model('Building',buildingRoomsSchema);
 module.exports = Building;