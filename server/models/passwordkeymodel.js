const mongoose = require("mongoose");

var PasswordKeySchema = new mongoose.Schema ({
  userEmail: String,
  key: String
});

PasswordKey = mongoose.model("passwordKeys", PasswordKeySchema);

module.exports = RandomKey;
