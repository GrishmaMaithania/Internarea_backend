const express = require('express');
const router = express.Router();
const User = require('../Model/User');
const requestIp = require('request-ip');
const userAgent = require('express-useragent');

router.use(requestIp.mw());
router.use(userAgent.express());


router.post("/", async (req, res) => {
  const { email, phoneNumber } = req.body; 
  const userIp = req.clientIp;
  const userAgentInfo = {
    browser: req.useragent.browser,
    os: req.useragent.os,
    device: req.useragent.platform
  };

  if (!email && !phoneNumber) {
    return res.status(400).json({ error: 'Email or phone number is required' });
  }

  try {
 
    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (phoneNumber) {
      user = await User.findOne({ phoneNumber });
    }

    if (user) {
     
      user.loginHistory.push({
        loginTime: new Date(),
        ip: userIp,
        deviceInfo: userAgentInfo
      });
    } else {
  
      user = new User({
        email,
        phoneNumber,
        ip: userIp,
        deviceInfo: userAgentInfo,
        loginHistory: [{
          loginTime: new Date(),
          ip: userIp,
          deviceInfo: userAgentInfo
        }]
      });
    }

    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    console.error("Error saving user info:", error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  const { email, phoneNumber } = req.query;
  try {
    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (phoneNumber) {
      user = await User.findOne({ phoneNumber });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

