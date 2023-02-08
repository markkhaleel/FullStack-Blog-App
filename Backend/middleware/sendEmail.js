const nodemailer = require('nodemailer')

const sendEmail = (result) => {

    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "privatekeyverify@gmail.com",
            pass: "wxqkdqluthazsvef"
        }
    });

    const options = {
        from: "privatekeyverify@gmail.com",
        to: result.email,
        subject: "MB Verification Email",
        html: `<h3><p>Dear ${result.fullname},</p></h3>
        <p>Thank you for creating an account. Please use below verification code to confirm your email address and activate your account.<p>Your verification code is:</p><h2> ${result.otp} </h2><p>This verification code is valid for 5 minutes.</p>\nMB`
    }

    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err)
        }   
        else {
            console.log(info);
        }
    })
}

module.exports = sendEmail;