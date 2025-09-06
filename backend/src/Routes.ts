import express, { Router } from "express";
import { AuthMiddleWare } from "./MiddleWare/AuthMiddleWare.js";
import Controllers, { tempAuthKey } from "./Controllers.js";
import passport from './utilities/oAuth20.js'
import jwt from 'jsonwebtoken';
import { JWT_TOKEN } from "./index.js";

const route: Router = express.Router();

route.post("/signup",Controllers.signUpController);
route.post("/sendotp",Controllers.SendOtpController);
route.post("/login",Controllers.LoginController);

route.post("/generate",AuthMiddleWare,Controllers.GenarateRoadmapController);
route.get("/roadmap/:roadMapId",AuthMiddleWare,Controllers.showRoadMapController)
route.get("/getAllRoadmaps",AuthMiddleWare,Controllers.getAllRoadmapsController);


route.post("/contact",Controllers.contact);

route.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

route.get("/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user as any
    const token = jwt.sign(
      { id:user._id.toString(), email:user.email },
      JWT_TOKEN || tempAuthKey,
    );

    // Inject a small script in the popup
    res.send(`
      <script>
        window.opener.postMessage(
          ${JSON.stringify({ token})},
          "*"
        );
        window.close();
      </script>
    `);
  }
);


export default route;
