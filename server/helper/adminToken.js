const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["token"];
  if (!token) {
    res.status(401).json({ message: "token reqired" });
  }
  try {
    const decoded = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({message:"Invalid Token"});
  }
  return next();
};

module.exports = verifyToken;