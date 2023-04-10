const { default: mongoose } = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://HamzaJavedShaikh:12@cluster0.blo8xq3.mongodb.net/MAJORECOMRCEPROJECT",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Connected To Db ---- :)");
  } catch (error) {
    console.log("ERorr Occured During Connecting To DB", error);
  }
};
