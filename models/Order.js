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
      ref: "users",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "products",
    },
    details: {
      type: Schema.Types.ObjectId,
      ref: "details",
    },
  },
  { timestamps: true }
);

module.exports = Order = mongoose.model("order", orderSchema);
