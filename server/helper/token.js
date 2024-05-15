const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["token"];
  if (!token) {
    res.status(401).send({ message: "token reqired" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    console.log("Token error :", err)
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;