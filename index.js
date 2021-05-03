const express = require("express"); //*Detta är commonJS module(s)
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./models/User");
require("./services/passport");
const keys = require("./config/keys");
const mongoose = require("mongoose");

const app = express(keys.mongoURI);

//Skapar en cookie basically
//app.use() kopplar samma våran middleWare också
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

require("./routes/authRoutes")(app);

//*Väljer dynamiskt vilken port vi ska lyssna på
const PORT = process.env.PORT || 5000;

app.listen(PORT);
