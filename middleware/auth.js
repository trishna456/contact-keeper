const jwt = require('jsonwebtoken'); // to verify the token
const config = require('config'); //becuse we need access to jwtSecret

//creating a middleware which will allow us to send this token when we are trying to
//access some protected routes

//middleware is just a function that has access to the request and response cycle
//and the req and res obj
//everytime we hit an endpoint we just have to fire off a middleware to check if there is
//a token in the header

module.exports = function(req, res, next) {
  //need to export the function
  //after we do what we want to do, we just call the next() which indicates to move on to
  //the next piece of middleware

  //get token from header
  const token = req.header('x-auth-token');

  //check if not token
  if (!token) {
    res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    //the payload gets pulled out in decoded
    req.user = decoded.user;
    //so that we will have access to user inside the route
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
