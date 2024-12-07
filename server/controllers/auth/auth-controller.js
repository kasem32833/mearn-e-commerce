const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require ('../../models/User.js')


// register
const registerUser = async(req, res, next)=>{
    const {userName, email, password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = new User({
        userName, 
        email, 
        password: hashedPassword
    })
        await newUser.save();
        res.status(200).json({
            success: true,
            message: "Registration Successfull"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })

        next(error)
        
    }

    
    
}
// login


// logout
// auth middleware


module.exports = {registerUser};