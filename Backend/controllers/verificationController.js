const User = require('../model/User');

const verifyEmail = async (req, res) => {
    const { email, otp } = req.body;
    if (!otp) return res.status(400).json({ "message": "otp is required" });
    const foundUser = await User.findOne({ email }).exec();

    const date = new Date()
    const creationDate = foundUser.createdAt;
    console.log(foundUser.createdAt)
    const timeDifference = (date * 1 - creationDate * 1) / (60 * 1000)
    console.log(timeDifference)
    if (timeDifference > 5) return res.status(203).json({ "message": "Time exceeded 5 minutes" })
    if (timeDifference <= 5 && otp == foundUser.otp) {
        foundUser.isActive = true
        const result = await foundUser.save()
        res.json({ "message": "Successfully Verified" })
    } else {
        res.status(203).json({"message" : "OTP is incorrect"})
    }
}

module.exports = verifyEmail;



