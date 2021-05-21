const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// mongodb+srv://dbUser:3CeJxTiKZRWMBPx8@cluster0.cvami.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // We have a record of this user
        return done(null, existingUser);
      }
      //This user does not exist, add it!
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
