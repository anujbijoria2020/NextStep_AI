import type { Request,Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "../index.js";
import { tempAuthKey } from "../Controllers.js";


export const AuthMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  console.log("token in middleware is: ",token);
  if (!token) {
    return res.status(401).json({
      message: "Token must be provided",
      success: false,
    });
  }
  try {
    const user = jwt.verify(token, JWT_TOKEN || tempAuthKey) as { id: string; email: string };
    console.log("user is fethced ")
    console.log("user in middleware is :",user);
    
    if (!user) {
      return res.status(401).json({
        message: "Unauthorised access, Sign Up First",
        success: false,
      });
    }
    (req as any).user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};
