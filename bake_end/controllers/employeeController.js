const Employee = require('../models/employee');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const{JWT_SECRET}=require('../keys')


// Get All Employees
const getEmployees= (req, res) =>{
    Employee.find()
    // .populate('createdBy','_id name')
    .then(employees=>{
      res.json(employees);
    })
    .catch(err=>{
     console.log(err);
    })
}

const getEmployeeById=(req, res,next) => {
let employeeID= req.params.employeeID;
Employee.findOne({_id:employeeID})
.then(response => {
 res.json({response})
})
.catch(err => {
    console.log(err);
    res.json({
        message:'error getting employee'
    });
})
}

const addEmployee = (req, res,next) => {
    const{employeeName,email,phoneNumber,jobPosition,password}=req.body;
        if (!employeeName||!email||!phoneNumber||!jobPosition||!password) {
          return  res.status(422).json({error:"please add all required fields"})
        }
        Employee.findOne({email:email})
        .then((savedUser)=>{
            if (savedUser) {
                res.status(422).json({error:"user already exists with that email"})
            }
            bcrypt.hash(password,12)
            .then(hashedpassword=>{
                const employee=new Employee({
                    employeeName,
                    email,
                    phoneNumber,
                    jobPosition,
                    password:hashedpassword,

                })
                employee.save()
                .then(employee=>{
                    res.json({message:"Information saved  successfully"})
                })
                .catch(err=>{
                    console.log(err);
                })
            })

        })
        .catch(err=>{
            console.log(err);
        })
}


const updateEmployee=(req, res,next) => {
    let employeeID=req.params.employeeID;
    let updatedData={
        email:req.body.email,
        employeeName:req.body.employeeName,
        phoneNumber:req.body.phoneNumber,
       jobPosition:req.body.jobPosition,

    };
    Employee.findByIdAndUpdate({_id:employeeID},{$set:updatedData})
    .then(()=>{
       res.json({
        message: 'Employee updated successfully'
       })
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            message: 'Error updating employee'
        })
    })
}

// Delete employee

const deletEmployee=(req, res,next) => {
    let employeeID=req.params.employeeID;

    Employee.findOneAndRemove({_id:employeeID})
    .then(()=>{
       res.json({
        message: 'Employee Deleted successfully'
       })
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            message: 'Error deleting employee'
        })
    })
}


const signIn=((req, res,next)=>{
    const {email,password}=req.body
    if(!email||!password){
     return  res.status(422).json({error:"please add email and password"})
    }
    Employee.findOne({email:email})
    .then(savedUser=>{
        if (!savedUser) {
            return res.status(422).json({error:"Invallid email and password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"Sussfully signed in"})
                const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
                const{_id,employeeName,email,jobPosition,phoneNumber}=savedUser
                res.json({token:token,user:{_id,employeeName,email,jobPosition,phoneNumber}})
            }
            else{
                return res.status(422).json({error:"Invallid email and password"})

            }
        })
        .catch(err=>{
            console.log(err);
        })
    })
})

module.exports={signIn,getEmployees,getEmployeeById,addEmployee,updateEmployee,deletEmployee}

