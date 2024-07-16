// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { Users } from "../models/usersModel.js";
// import dotenv from "dotenv";

// dotenv.config(); // เพิ่มบรรทัดนี้เพื่อโหลดค่าตัวแปรสภาพแวดล้อมจากไฟล์ .env

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await Users.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       const { id, emails, name } = profile;
//       try {
//         let user = await Users.findOne({ googleId: id });
//         if (!user) {
//           user = await Users.create({
//             googleId: id,
//             email: emails[0].value,
//             firstName: name.givenName,
//             lastName: name.familyName,
//           });
//         }
//         done(null, user);
//       } catch (err) {
//         done(err, null);
//       }
//     }
//   )
// );
