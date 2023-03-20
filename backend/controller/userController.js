const User = require("../model/userModel");
const sendToken = require("../utils/jwtToken");

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
    
    sendToken(user,201,res)
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
          sendToken(user,200,res)
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