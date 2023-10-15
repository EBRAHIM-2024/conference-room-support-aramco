const mongoose = require('mongoose');
const {ObjectId}=mongoose.Schema.Types
const Schema=mongoose.Schema;

timestamps = require('mongoose-timestamp')

const departmentSchema=new Schema({
    name:{type:String,require:true,},
    room:{type:ObjectId,ref:'Room'},
    createdBy:{type:ObjectId,ref:'Employee'},
    isDeleted:{type:Boolean,default:false},
},
{ timestamps: true }
)

 const Department=mongoose.model('Department',departmentSchema);
 module.exports=Department