const jwt = require('jsonwebtoken');
const ApiError = require('../helper/apiError');
const httpStatus = require('../util/httpStatus');
const userService = require('../services/user.service')


const protect = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        let token;
        token = req.headers.authorization.split(" ")[1];
        if (!token) {
            next(new ApiError("Unauthorized Access", httpStatus.unautherized))
        }
        try {
            const decoded = await jwt.verifyToken(token, "accessToken");
            const currentuser = await userService.getUserById(decoded._id);
            if(!currentuser){
                return next(new ApiError(httpStatus.unautherized, "User not found"));
            }
            req.user=currentuser;
            next();

        }
        catch(e)
        {
            next(new ApiError("Unauthorized Access", httpStatus.unautherized))
        }
        
    }

}
const restrictTo = (...roles) => {
    return (req, res, next) => {
      if (roles.includes(req.user.role)) {
        return next(); // Allow the request to proceed if the role is allowed
      }
  
      return next(new ApiError(httpStatus.unautherized, "You are not allowed")); // Reject the request if role is not allowed
    };
  };
  module.exports = { protect, restrictTo };