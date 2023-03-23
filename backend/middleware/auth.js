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

exports.authorizeRole = (...roles) =>{
    return (req,res,next) =>{

    //roles me se routes me admin pass karenge or login ke time pe isAuthenticate funcyion function me req.user me user ki details save karai he usme se check krenge
        if(!roles.includes(req.user.role))
        {
            return res.status(401).json({
                success:false,
                message:`Role : ${req.user.role} is not allowed to access this resources`
            })
        }

        next();
    }
}
