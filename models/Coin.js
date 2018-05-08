const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CoinSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  ticker: {
    type: String,
    required: true
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ]
});

module.exports = Coin = mongoose.model("coin", CoinSchema);
