const express = require('express');
const client = require('twilio')('AC0fbbcf7287e679a6b8e177c478544ac3', 'ddcec0f282b36b0e6622d53183dd7c43');

const mongoose= require('mongoose');
// const bodyParser = require('body-parser');
const  cors = require('cors');
const app = express();
require('dotenv').config();
const dotenv= require('dotenv');

const EmployeeRoute     = require('./routes/employee');
const InspectorRoute    = require('./routes/inspector');
const BuildingRouter    = require('./routes/building');
const DepartmentRouter  = require('./routes/department');
const RoomRouter        = require('./routes/room');
const TiketRouter       = require('./routes/tiket');


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
// require('./models/employee')
// require('./models/department')
// require('./models/conference_room')
// require('./models/building')
app.use(express.json());
// app.use(require('./routes/employee'))
// app.use(require('./routes/building_router'))

app.use(cors());



// app.use(bodyParser.json())
app.post('/send-sms', (req,res) => {
    const{body,to}=req.body;
    function sendSMS(){
        client.messages
        .create({
            body: body,
            from: 'whatsapp:+14155238886',
            to: to
        })
        .then(message => console.log(message.sid))
        .catch(err => console.log(err.message))

    }
    sendSMS();
});
// 'Your appointment is coming up on July 21 at 3PM'
// ''

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`SERVER LISINING ${PORT}`);
});

app.use('/api/employee',EmployeeRoute);
app.use('/api/employee',InspectorRoute);
app.use('/api/employee',BuildingRouter);
app.use('/api/employee',RoomRouter);
app.use('/api/employee',TiketRouter);
app.use('/api/employee',DepartmentRouter);





