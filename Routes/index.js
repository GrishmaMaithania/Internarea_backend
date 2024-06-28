const express = require("express");
const router = express.Router();
const ApplicationRoute = require("./ApplicationRoute");
const intern = require("./internshipRoute");
const job = require("./jobRoute");
const admin = require("./admin");
const userRoutes = require("./userRoute"); 
const Otp=require("./otproute")

router.get("/", (req, res) => {
    res.send("This is backend");
});


router.use('/application', ApplicationRoute);
router.use('/internship', intern);
router.use('/job', job);
router.use('/admin', admin);
router.use('/users', userRoutes);

router.use('/otp',Otp)


module.exports = router;
