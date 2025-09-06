import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../db.js";
import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "../index.js";
import { tempAuthKey } from "../Controllers.js";
import dotenv from "dotenv"
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${process.env.BASE_URL}/auth/google/callback`, // change in production
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails?.[0]?.value });

        if (!user) {
          user = new User({
            email: profile.emails?.[0]?.value,
            isVerified: true,
          });
          await user.save();
        }
        const token = jwt.sign(
          { id: user._id, email: user.email },
          JWT_TOKEN || tempAuthKey,
        );

        return done(null,user);
      } catch (error) {
        return done(error,false);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

export default passport;
