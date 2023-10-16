const express=require('express');
const accountSid = 'AC0fbbcf7287e679a6b8e177c478544ac3';
const authToken = '283c492716a7507995816d6b43e0776e';
const client = require('twilio')(accountSid, authToken);
// const room=mongoose.model('room');

const sendSMS=(req,res) => {
    const{body,to}=req.body;
    client.messages
    .create({
        body: body,
        from: 'whatsapp:+14155238886',
        to: to,
    })
    .then(message => console.log(message.sid))
    .catch(err => console.error(err));
};

module.exports={sendSMS}
