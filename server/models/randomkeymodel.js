const mongoose = require("mongoose");

var RandomKeySchema = new mongoose.Schema ({
  userEmail: String,
  key: String
});

RandomKey = mongoose.model("randomKeys", RandomKeySchema);

module.exports = RandomKey;
