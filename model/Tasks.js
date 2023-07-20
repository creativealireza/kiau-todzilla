const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskId: {
    type: Number,
  },
  title: {
    type: String,
    maxLength: [60, "maximum length is 60 characters"],
    required: [true, 'field "title" is required'],
  },
  description: {
    type: String,
    maxLength: [100, "maximum length is 100 character"],
  },
  isCompleted: {
    type: Boolean,
  },
  isDeleted: {
    type: Boolean,
  },
  isEdited: {
    type: Boolean,
  },
  members: {
    type: Array,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
