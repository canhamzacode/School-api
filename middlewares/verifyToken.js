const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors");

const verifyToken = (allowedRoles) => (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Token is missing or in an invalid format");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (allowedRoles && !allowedRoles.includes(decoded.role)) {
      throw new UnauthorizedError("Unauthorized access");
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.log(token);
    console.log(error);
    throw new UnauthorizedError("Invalid token");
  }
};

module.exports = verifyToken;
