if (process.env.NODE.env === "production") {
  // We are in production
  module.exports = require("./prod");
} else {
  // We are in development
  module.exports = require("./dev");
}
