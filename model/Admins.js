const mongoose = require("mongoose");
const bcryptjs = require('bcrypt');
const task = require("./Tasks");

const AdminSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
  },
  linkedIn: {
    type: String,
  },
  github: {
    type: String,
  },
  skills: {
    type: Array,
  },
  language: {
    type: Array,
  },
  profilePhoto: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
  members: {
    type: Array,
  },
  tasks: {type: [task.schema]}
});

AdminSchema.pre('save', function(next) {
  const admin = this;
  if (!admin.isModified('password')) {
    return next();
  }

  bcryptjs.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcryptjs.hash(admin.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }

      admin.password = hash;
      next();
    });
  });
});

const Item = mongoose.model("Admin", AdminSchema);
module.exports = Item;
