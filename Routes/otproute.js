const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Otp = require('../Model/otp');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'internareaa@gmail.com',
    pass: 'jeku kjjk oiou ngup'
  }
});

// Generate OTP
const generateOTP = () => {
  return crypto.randomBytes(3).toString('hex'); 
};


router.post('/sendotp', async (req, res) => {
  const { email } = req.body;

  const otp = generateOTP();

  try {
   
    await transporter.sendMail({
      from: 'internareaa@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`
    });

    
    const otpRecord = new Otp({ email, otp });
    await otpRecord.save();

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/verifyotp', async (req, res) => {
  const { email, otp } = req.body;

  try {
   
    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
      return res.status(404).json({ error: 'OTP record not found' });
    }

    if (otpRecord.otp === otp) {
    
      res.status(200).json({ message: 'OTP verified successfully' });
    } else {
    
      res.status(400).json({ error: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
