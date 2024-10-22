import jwt from "jsonwebtoken";
import Member from "../model/member.model.js";

export const verifyAdmin = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Authorization token required", status: false });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Check if the user is an admin
    const user = await Member.findById(req.user.id);
    if (user.status !== "admin") {
      return res
        .status(403)
        .json({ msg: "Access denied. Admins only.", status: false });
    }

    next();
  } catch (error) {
    console.error("Authorization error:", error.message);
    return res
      .status(403)
      .json({ msg: "UnAuthorizated. Please Login again", status: false });
  }
};
