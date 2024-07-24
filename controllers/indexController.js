const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors")
const Student = require('../models/studentModel')
const ErrorHandler = require("../utils/ErrorHandler")
const { sendMail } = require("../utils/nodemailer")
const { sendtoken } = require("../utils/sendToken")

exports.homepage = catchAsyncErrors (async (req,res,next)=>{
        res.json({message:'this is a secured page'})
})

exports.currentUser = catchAsyncErrors (async (req,res,next)=>{
    const student = await Student.findById(req.id).exec()
    res.json({student})
})

exports.studentSignup = catchAsyncErrors (async (req,res,next)=>{
    const student = await new Student(req.body).save()
    sendtoken(student,201,res)
    // res.status(201).json(student)

})

exports.studentSignin = catchAsyncErrors (async (req,res,next)=>{
   const student = await Student.findOne({email:req.body.email}).select("+password").exec()

   if(!student) return next(new ErrorHandler("Student not found",404))

   const isMatch = student.comparePassword(req.body.password)
   if(!isMatch) return next(new ErrorHandler('wrong credientials',500)) 
    sendtoken(student,200,res)
//    res.json(student)
})

exports.studentSignout = catchAsyncErrors (async (req,res,next)=>{
    res.clearCookie('token')
    res.json({message:'successfully signout'})
})

exports.studentSendMail = catchAsyncErrors (async (req,res,next)=>{
    const student = await Student.findOne({email:req.body.email}).exec()

    if(!student)  return next(new ErrorHandler("Student not found",404))
    
    const url = `${req.protocol}://${req.get("host")}/student/forgot-link/${student._id}`

    sendMail(student,url,res,next)    
})

exports.studentForgetLink = catchAsyncErrors (async (req,res,next)=>{
    const student = await Student.findById(req.params.id).exec()
    console.log(student)
    if(!student) return next(new ErrorHandler("Student not found",404))
    
        student.password  = req.body.password
        await student.save()

        res.status(200).json({
            message:"password reset successfully"
        })
})