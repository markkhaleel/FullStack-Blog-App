const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token(forbidden)
            req.userId = decoded.UserInfo.userId;
            next();
        }
    )
}
module.exports = verifyJWT;