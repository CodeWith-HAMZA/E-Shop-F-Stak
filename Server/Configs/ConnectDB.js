const { default: mongoose } = require("mongoose");

module.exports = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://HamzaJavedShaikh:12@cluster0.blo8xq3.mongodb.net/MAJORECOMRCEPROJECT",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  } catch (error) {
    console.log("ERorr Occured During Connecting To DB", error);
  }
};
