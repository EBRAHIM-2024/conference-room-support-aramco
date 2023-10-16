const express=require('express');
const accountSid = process.env.AccountSid;
const authToken = process.env.AuthToken;
const client = require('twilio')(accountSid, authToken);
require('dotenv').config();
const dotenv= require('dotenv');

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
