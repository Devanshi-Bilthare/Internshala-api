const express = require('express')
const router = express.Router()
const {homepage,studentSignup,studentSignin,studentSignout, currentUser,studentSendMail,studentForgetLink} = require('../controllers/indexController')
const { isAuthenticated } = require('../middlewares/auth')


// GET / 
router.get('/',isAuthenticated,homepage)

router.post('/currentUser',isAuthenticated,currentUser)


// Post /student/signup
router.post('/student/signup',studentSignup)

router.post('/student/signin',studentSignin)

router.get('/student/signout',isAuthenticated,studentSignout)

router.post('/student/send-mail',isAuthenticated,studentSendMail)

router.get('/student/forgot-link/:id',studentForgetLink)


module.exports = router