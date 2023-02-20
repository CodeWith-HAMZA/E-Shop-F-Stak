const { default: mongoose } = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://hamza:12@cluster0.ozwptr8.mongodb.net/tnt",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Connected To Db ---- :)");
  } catch (error) {
    console.log("ERorr Occured During Connecting To DB", error);
  }
};
