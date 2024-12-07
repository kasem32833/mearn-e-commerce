const express = require('express');
const { registerUser } = require('../../controllers/auth/auth-controller');
const userRouter  =  express.Router();


userRouter.post('/register', registerUser)

//userRouter.get('/profile', userProfile)


module.exports = userRouter;