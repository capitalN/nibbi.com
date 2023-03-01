const { default: mongoose } = require("mongoose");

const connect = mongoose.connect(
  "mongodb+srv://nikhil:nikhil@cluster0.8ffrcyb.mongodb.net/dermstore?retryWrites=true&w=majority"
);

module.exports = { connect };
