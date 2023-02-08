const cloudinary = require('cloudinary').v2;

const cloudConnect = () => {
    cloudinary.config({
        secure: true,
        cloud_name: process.env.CLOUDINARY_USER_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
}

module.exports = cloudConnect;

// https://res.cloudinary.com/dhi4lq2xs/image/upload/v1675264127/ProfilePictures/wnkt9gm2fb368auyowvn.jpg

// https://res.cloudinary.com/dhi4lq2xs/image/upload/v1675267729/Profile%20Pictures/onuf8kj79pn2pwer8on8.jpg
// https://res.cloudinary.com/dhi4lq2xs/image/upload/v1675267785/Profile%20Pictures/rvnvssiibrgudnvdcors.jpg

// https://res.cloudinary.com/dhi4lq2xs/image/upload/v1675268112/Profile%20Pictures/undefined.jpg