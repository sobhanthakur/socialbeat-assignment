const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const detailSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Detail = mongoose.model("detail", detailSchema);
