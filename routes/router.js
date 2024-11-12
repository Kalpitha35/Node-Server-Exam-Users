const express = require('express')
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

const router = new express.Router()

//register : http://localhost:4000/register
router.post('/register',userController.registerController)

//login : http://localhost:4000/login
router.post('/login',userController.loginController)

// all-users : http://localhost:4000/all-users
router.get('/all-users',jwtMiddleware,userController.allUserController)

// single-user : http://localhost:4000/single-user
router.get('/single-user',jwtMiddleware,userController.singleUserController)

module.exports = router