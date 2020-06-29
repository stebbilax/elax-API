const sgMail = require('@sendgrid/mail');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");


sgMail.setApiKey(process.env.SENDGRID_API_KEY);


exports.sendEmail = asyncHandler(async (req, res, next) => {

    const msg = {
        to: 'stebbilax@gmail.com',
        from: `${req.body.email}`, // Use the email address or domain you verified above
        subject: `${req.body.name}`,
        text: `${req.body.text}`,
    }
    await sendEmail(req, res, next, msg);
})



const sendEmail = async (req, res, next, msg) => {

    try {
        await sgMail.send(msg);
        res.status(200).json({ success: true })


    } catch (error) {
        next(new ErrorResponse('Could not send', 500))


        if (error.response) {
            console.error(error.response.body)
        }
    }

}