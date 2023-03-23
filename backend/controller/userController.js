const User = require("../model/userModel");
const sendToken = require("../utils/jwtToken");

//register user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "This is a sample id",
        url: "sample url",
      },
    });

    //user User model ka refrence he isliye user object ka use krke User model ki koi bhi method ko call kara skte he

    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

//login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email or password",
      });
    } else {
      const user = await User.findOne({ email: email }).select("+password");

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or passsword",
        });
      } else {
        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
          return res.status(401).json({
            success: false,
            message: "Invalid email or passsword",
          });
        } else {
          sendToken(user, 200, res);
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

//logout user
exports.logoutUser = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      message: "Logut successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

//forgot password
exports.forgotPassword = async(req,res)=>{

  try {
    
    const {email} = req.body;

    const user = User.findOne({email})

    if(!user)
    {
      return res.status(404).json({
        success:false,
        message:`User not found with email ${email}`
      })
    }

    //get resetpassword token

     const resetToken =  user.getResetPasswordToken();

    //  getResetPasswordToken ye function me model resetPasswordToken,resetPasswordExpire ye sirf add hua he save nahi hua he to isko save krna padega
    await user.save({validateBeforeSave:false});


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
}