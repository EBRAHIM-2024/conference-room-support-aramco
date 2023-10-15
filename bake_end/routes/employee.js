const express=require('express');
const router=express.Router();
// const mongoose=require('mongoose');
// const Employee=mongoose.model('Employee');
// const jwt=require('jsonwebtoken');
// const{JWT_SECRET}=require('../keys')
const requireLogin=require('../middelware/requireLogin')

const EmployeeController=require('../controllers/employeeController');

router.get('/getEmployees',requireLogin,EmployeeController.getEmployees)
router.post('/signIn',EmployeeController.signIn)
router.post('/getEmployeeById/:employeeID',requireLogin,EmployeeController.getEmployeeById)
router.post('/addEmployee',requireLogin,EmployeeController.addEmployee)
router.post('/updateEmployee/:employeeID',requireLogin,EmployeeController.updateEmployee)
router.post('/deletEmployee/:employeeID',requireLogin,EmployeeController.deletEmployee)



module.exports = router






















// router.get('/',(req, res)=>{
//     res.send('hello world');
// })

// router.get('/protected',requireLogin,(req,res)=>{

//     res.send('hello Employee');
// });


// router.post('/signup',(req, res)=>{
//     const{name,email,phone,jobPosition,department,password}=req.body;
//     if (!email||!password||!name||!phone||!jobPosition||!department) {
//       return  res.status(422).json({error:"please add all required fields"})
//     }
//     Employee.findOne({email:email})
//     .then((savedUser)=>{
//         if (savedUser) {
//             res.status(422).json({error:"user already exists with that email"})
//         }
//         bcrypt.hash(password,12)
//         .then(hashedpassword=>{
//             const employee=new Employee({
//                 email,
//                 password:hashedpassword,
//                 name,
//                 phone,
//                 jobPosition,
//                 department,
//             })
//             employee.save()
//             .then(employee=>{
//                 res.json({message:"Informational  saved  successfully"})
//             })
//             .catch(err=>{
//                 console.log(err);
//             })
//         })

//     })
//     .catch(err=>{
//         console.log(err);
//     })
// })



// module.exports=router

