const express=require('express');
const accountSid = process.env.AccountSid;
const authToken = process.env.AuthToken;
const client = require('twilio')(accountSid, authToken);
require('dotenv').config();
const dotenv= require('dotenv');

const sendSMS=(req,res) => {
    const{message,to}=req.body;
    console.log("credentials are:____" + accountSid +  "-" + authToken + "______");
    try {
        client.messages
    .create({
        body: message,
        from: 'whatsapp:+14155238886',
        to: to,
    })
    //.then(message=>console.log(" message sent successfully",message))
    .then(message=>console.log(message))
    return res.status(200).json({success: true, msg: message})

    }catch(error) {
          return res.status(400).json({success: false, msg:error.message})

    }


};

module.exports={sendSMS}
