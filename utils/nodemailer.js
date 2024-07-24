const nodemailer = require('nodemailer')
const ErrorHandler = require('./ErrorHandler')

exports.sendMail = (student,url,res,next)=>{
    const transport = nodemailer.createTransport({
        service:'gmail',
        host:'smtp.gmail.com',
        post:465,
        auth:{
            user: "devanshibilthare@gmail.com",
            pass: process.env.MAIL_PASSWORD  
        }
    })

    const mailOptions = {
        from:"internshala private ltd <devanshi@gmail.com>",
        to:student.email,
        subject:'password reset link',
        text:'do not share this link with any one',
        html:`<h1>Click below link to change your password</h1>
                <a href="${url}">${url}</a>`

    }

    transport.sendMail(mailOptions,async (err,info)=>{
        if(err) return next(new ErrorHandler(err,500))

        return res.status(200).json({message:'mail sent successfullt',url})

    })
}