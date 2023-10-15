const mongoose = require('mongoose');
const {ObjectId}=mongoose.Schema.Types
const Schema=mongoose.Schema;
timestamps = require('mongoose-timestamp')

const inspectorSchema= new Schema({
    inspector:{type:String,require:true,},
    phoneNumber:{type:Number,require:true},
    email:{type:String,require:true,unique:true},
    createdBy:{type:ObjectId,ref:'Employee'},
    isDeleted:{type:Boolean,default:false},
},
{ timestamps: true }
)

 const Inspector =mongoose.model('Inspector',inspectorSchema);
 module.exports = Inspector