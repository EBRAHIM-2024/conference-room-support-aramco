const express=require('express');
const accountSid = process.env.AccountSid;
const authToken = process.env.AuthToken;
const client = require('twilio')(accountSid, authToken);
require('dotenv').config();
const dotenv= require('dotenv');

const sendSMS=(req,res) => {
    const{body,to}=req.body;

    try {
        client.messages
    .create({
        body: body,
        from: 'whatsapp:+14155238886',
        to: to,
    })
    .then(message=>console.log(" message sent successfully"))

    return res.status(200).json({success: true, msg: "message sent successfully"})

    }catch(error) {
          return res.status(400).json({success: false, msg:error.message})

    }


};

module.exports={sendSMS}
