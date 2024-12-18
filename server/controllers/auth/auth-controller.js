const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User.js");

// register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  console.log(userName, email, password)
  
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
    const checkUser = await User.findOne({email: email})
    if(!checkUser){
      return res.json({
        success: false,
        message: "User doesn't exist please register first"
      })
    }
    const chekdPassword = await bcrypt.compare(password, checkUser.password);

    if(!chekdPassword){
      return res.json({
        success: false,
        message: "Password doesn't match please try aganin"
      })
    }

    const token = jwt.sign({
      id: checkUser._id,
      email: checkUser.email,
      role: checkUser.role,
    }, "CLIENT_SECRET_KEY", 
    {expiresIn: "60min"}
    )

    res.cookie('token', token, {httpOnly: true, secure: false},).json({
      success: true,
      message: "User Login successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id
      }

    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// logout
  const logoutUser = (req, res)=>{
    res.clearCookie('token').json({
      success: true,
      message: "logout successfully!"
    })
  }
// auth middleware(for checking is user available and token is valid)

const authMiddleWare = async(req, res, next)=>{
  const token = req.cookiees('token')

  if(!token){
    return res.status(401).json({
      success: false,
      message: "Unauthorized User"
    })
  }

  try {
    const decoded = jwt.verify(token, CLIENT_SECRET_KEY, );
    req.user = decoded ;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized User"
    })
  }
}

module.exports = { registerUser, loginUser, logoutUser,  authMiddleWare };
