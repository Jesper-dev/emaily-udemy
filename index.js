const express = require("express"); //*Detta är commonJS module(s)
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./models/User");
require("./services/passport");
const keys = require("./config/keys");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express(keys.mongoURI);

app.use(bodyParser.json());

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
require("./routes/billingRoutes")(app);

//* Serving files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//*Väljer dynamiskt vilken port vi ska lyssna på
const PORT = process.env.PORT || 5000;

app.listen(PORT);
