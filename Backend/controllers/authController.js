const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ "message": "Username and Password are required" });
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) return res.sendStatus(401);
    if (foundUser.isActive == false) return res.status(400).json({ "message": "Account is not verified yet" })
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "userId": foundUser._id,
                    "username": foundUser.username
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '60s' }
        )
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(`Logged in\nRefresh Token: ${foundUser.refreshToken}`)

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken, foundUser })
    } else if (!match) {
        res.status(401).json({ "message": "Username or Password is incorrect" });
    }
}

module.exports = handleLogin;



