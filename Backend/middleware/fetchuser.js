const jwt = require('jsonwebtoken');
const JWT_SECRET = 'harryisagoodboy'; // SAME EVERYWHERE

const fetchuser = (req, res, next) => {
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).json({
      error: "No token provided, authorization denied"
    });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(401).json({
      error: "Invalid or expired token"
    });
  }
};

module.exports = fetchuser;
