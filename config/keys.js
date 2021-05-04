if (process.env.NODE_ENV == "production") {
  // We are in production
  module.exports = require("./prod.js");
} else {
  // We are in development
  module.exports = require("./dev.js");
}
