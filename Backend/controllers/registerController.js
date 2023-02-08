const User = require('../model/User')
const bcrypt = require('bcrypt');
const sendEmail = require('../middleware/sendEmail');

const handleNewUser = async (req, res) => {
    const { email, fullname, username, password } = req.body;
    const duplicateEmail = await User.findOne({ email }).exec()
    const duplicateUsername = await User.findOne({ username }).exec()
    if (duplicateEmail && duplicateEmail.isActive) return res.status(203).json({ "message": "Email is already in use" })
    else if (duplicateUsername && duplicateUsername.isActive) return res.status(203).json({ "message": "Username already registered" })
    else {
        if (duplicateEmail && !duplicateEmail.isActive) {
            User.findOneAndDelete({ email });
        }
        try {
            const hashedPwd = await bcrypt.hash(password, 10);
            const result = await User.create({
                email: email.toLowerCase(),
                fullname,
                username,
                password: hashedPwd,
                otp: Math.floor(100000 + Math.random() * 900000),
            })
            console.log(result);
            res.status(201).json({ "message": `New user ${fullname} created!` });
            sendEmail(result)
        } catch (error) {
            res.status(500).json({ "message": error.message })
        }
    }
}

module.exports = handleNewUser; 