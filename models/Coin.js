const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CoinSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ticker: {
    type: String,
    required: true
  }
});

module.exports = Coin = mongoose.model("coins", CoinSchema);
