require('dotenv').config();
const dotenv= require('dotenv');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser')
const mongoose= require('mongoose');
// const bodyParser = require('body-parser');
const  cors = require('cors');
const app = express();
app.use(bodyParser.urlencoded({ extended:false }));
const TeleToken=process.env.TeleToken;
const accountSid = process.env.AccountSid;
const authToken = process.env.AuthToken;
const client = require('twilio')(accountSid, authToken);


const EmployeeRoute     = require('./routes/employee');
const InspectorRoute    = require('./routes/inspector');
const BuildingRouter    = require('./routes/building');
const DepartmentRouter  = require('./routes/department');
const RoomRouter        = require('./routes/room');
const TiketRouter       = require('./routes/tiket');
const SMSRouter         = require('./routes/sms');



// _________________________Database Connection_________________________
const {MONGOURI}=require('./keys');
mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected',() =>{
console.log("Connection Database is sussfully");
})
mongoose.connection.on('err',() =>{
    console.log("Connection Database is sussfully",err);
})

// _____________________________________________________________________

app.use(express.json());


app.use(cors());



// app.use(bodyParser.json())
app.post('/send-sms', (req,res) => {
    const{body,to}=req.body;
    client.messages
    .create({
        body: "hello world",
        from: 'whatsapp:+14155238886',
        to: to,
        })
    .then(message => console.log(message.sid))
    .catch(err => console.error(err));
});
// 'Your appointment is coming up on July 21 at 3PM'
// ''

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
	console.log(`SERVER LISINING ${PORT}`);
});

app.use('/api/employee',EmployeeRoute);
app.use('/api/employee',InspectorRoute);
app.use('/api/employee',BuildingRouter);
app.use('/api/employee',RoomRouter);
app.use('/api/employee',TiketRouter);
app.use('/api/employee',SMSRouter);
app.use('/api/employee',DepartmentRouter);





