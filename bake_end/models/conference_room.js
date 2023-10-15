const mongoose = require('mongoose');
const {ObjectId}=mongoose.Schema.Types
const Schema=mongoose.Schema;
timestamps = require('mongoose-timestamp')

const roomSchema= new Schema({
    roomName:{type:String,require:true,},
    building:{type:ObjectId,ref:'Building'},
    employee:{type:ObjectId,ref:'Employee'},
    inspector:{type:ObjectId,ref:'Inspector'},
    createdBy:{type:ObjectId,ref:'Employee'},
    isDeleted:{type:Boolean,default:false},
},
{ timestamps: true }
)

 const Room=mongoose.model('Room',roomSchema);
 module.exports=Room;