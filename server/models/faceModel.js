const mongoose = require("mongoose");

const faceSchema = new mongoose.Schema({
    user: {
      type: String,
      required: true,
      unique: true,
    },
    descriptions: {
      type: Array,
      required: true,
    },
  });
  
  const Face = mongoose.model("faceData", faceSchema);
  module.exports = Face;