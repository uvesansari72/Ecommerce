const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.isAuthenticateUser = async (req, res, next) => {

    //isme check karenge pehle ke user login  heke  nahi.. logi ke time pe cookies me token store karai he
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: "false",
      message: "Please login to acces this route",
    });
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  //token me id store karai he
  
  req.user = await User.findById(decodedData.id);
  next();
};
