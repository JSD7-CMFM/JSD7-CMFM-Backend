import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Users } from "../models/usersModel.js"; // ใช้ named import

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findById(id); // ใช้ named import Users
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, emails, name } = profile;
      try {
        let user = await Users.findOne({ googleId: id }); // ใช้ named import Users
        if (!user) {
          user = await Users.create({ // ใช้ named import Users
            googleId: id,
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
          });
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
