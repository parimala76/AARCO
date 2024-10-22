import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.token || false;

  if (!token) {
    req.user = { success: false, message: "Unauthorized: No token provided" };
    next();
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      req.user = { success: false, message: "Unauthorized: Invalid token" };
    } else req.user = { success: true, decoded };
  });
  next();
};
