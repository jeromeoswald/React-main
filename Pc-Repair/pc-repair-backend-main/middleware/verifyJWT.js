const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const verifyJWT = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	req.user = verified.UserInfo.username;
	req.roles = verified.UserInfo.roles;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = verifyJWT;



