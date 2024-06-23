
// const jwt = require('jsonwebtoken');

// const ACCESS_TOKEN_SECRET = 'FSDWD58';

// const token = jwt.sign(
//     { UserInfo: { username: 'testuser', roles: ['user'] } },
//     ACCESS_TOKEN_SECRET,
//     { expiresIn: '1h' }
// );

// console.log('Generated Token:', token);

// const verifyJWT = (req, res, next) => {
//     const authHeader = req.headers.authorization || req.headers.Authorization;

//     if (!authHeader?.startsWith('Bearer ')) {
//         console.log('No auth header');
//         return res.status(401).json({ message: 'need authentication', isError: true });
//     }

//     const token = authHeader.split(' ')[1];

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//         if (err) {
//             console.log('Token verification error:', err);
//             return res.status(403).json({ message: 'no content access rights', isError: true });
//         }
//         if (!decoded || !decoded.UserInfo || !decoded.UserInfo.username) {
//             console.log('Invalid token structure');
//             return res.status(403).json({ message: 'no content access rights', isError: true });
//         }
//         req.user = decoded.UserInfo.username;
//         req.roles = decoded.UserInfo.roles;
//         next();
//     });
// };

// module.exports = verifyJWT;


const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verified.userId;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};



