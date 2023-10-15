const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const {ObjectId}=mongoose.Schema.Types
timestamps = require('mongoose-timestamp')

const tiketSchema= new Schema({
    name:{type:String,require:true,},
    email:{type:String,require:true},
    phoneNumber:{type:Number,require:true},
    employee:{type:String,require:true},
    inspector:{type:String,require:true},
    building:{type:String,require:true,},
    room:{type:String,require:true,},
    problem:{type:String,},
    // modifiedBy:{type:ObjectId,ref:"Employee"},
    isDeleted:{type:Boolean,default:false},
},
{ timestamps: true }
)

 const Tiket=mongoose.model('Tiket',tiketSchema);
 module.exports = Tiket;