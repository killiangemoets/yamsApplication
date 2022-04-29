var mongoose = require("mongoose");

const password = "NeGNPFcrsdBO39rV";

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(
  `mongodb+srv://admin:${password}@cluster0.tyjun.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  options,
  function (err) {
    console.log(err);
  }
);
