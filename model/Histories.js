const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  historyId: {
    type: Number,
  },
  members: {
    type: Array,
  },
  type: {
    type: String,
  },
  title: {
    type: String,
  },
  date: {
    type: String
  },
  adminId: {
    type: String
  }
});

module.exports = mongoose.model("History", HistorySchema);
