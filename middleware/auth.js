// middleware which will protect selected routes, 
// and ensure that a user is authenticated before allowing their requests to go through.

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
  	// extract token from req
    const token = req.headers.authorization.split(' ')[1];
    // decode extracted token using jsonwebtoken package
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // extract user id from decoded token 
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
