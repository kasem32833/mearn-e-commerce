const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User.js");

// register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  

  try {
    const checkUser = await User.findOne({email: email})
    if(checkUser){
       return res.json({
        success: false,
        message: "User already exist with same e mail please try with different email"
       })
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });
    
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration Successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
// login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const chekdPassword = await bcrypt.compare(password, 12);
    if(chekdPassword){
        const authUser = await User.findOne({email: email})
        res.status(200).json({
            success: true,
            message: "User Authenticated Successfully"
        })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// logout
// auth middleware

module.exports = { registerUser, loginUser };
