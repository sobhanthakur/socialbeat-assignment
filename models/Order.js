const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
    details: {
      type: Schema.Types.ObjectId,
      ref: "detail",
    },
  },
  { timestamps: true }
);

module.exports = Order = mongoose.model("order", orderSchema);
