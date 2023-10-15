const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const {ObjectId}=mongoose.Schema.Types
timestamps = require('mongoose-timestamp')

const buildingSchema= new Schema({
    buildingName:{type:String,require:true,unique:true},
    rooms:[{type:ObjectId,ref:'Room'}],
    createdBy:{type:ObjectId,ref:'Employee'},
    isDeleted:{type:Boolean,default:false},
},
{ timestamps: true }
)

 const Building=mongoose.model('Building',buildingSchema);
 module.exports = Building;