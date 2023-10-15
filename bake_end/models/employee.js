const mongoose = require('mongoose');
const Schema=mongoose.Schema;
timestamps = require('mongoose-timestamp')

const employeeSchema= new Schema({
    employeeName:{type:String,require:true,},
    phoneNumber:{type:Number,require:true},
    email:{type:String,require:true,unique:true},
    jobPosition:{type:String,require:true},
    password:{type:String,require:true},
    // modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:"Employee"},
    isDeleted:{type:Boolean,default:false},
},
{ timestamps: true }
)

 const Employee =mongoose.model('Employee',employeeSchema);
 module.exports = Employee