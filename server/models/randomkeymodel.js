const mongoose = require("mongoose");

var RandomKeySchema = new mongoose.Schema ({
  userEmail: String,
  key: String
});

RandomKeySchema.statics.authenticate = function(email, key, callback) {
  User.findOne({email: email}).exec(function(err, user) {
    if (err) {
      return callback(err)
    } else if (!user) {
      var err = new Error('User not found.');
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(key, RandomKey.key, function(err, result) {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback(err);
      }
    })
  });
}

RandomKey = mongoose.model("randomKeys", RandomKeySchema);

module.exports = RandomKey;
