const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

module.exports = (req, res, next) => {
  const token = req.cookies['authToken'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, decoded) => {
    if (err) {
      console.error('JWT Error:', err);
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
};
