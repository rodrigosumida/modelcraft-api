var mongoose = require("mongoose");

// __dev__
//mongoose.connect(process.env.URI_MONGODB, {
// __prod__
mongoose.connect(process.env.URI_MONGODB, {});

module.exports = mongoose;
