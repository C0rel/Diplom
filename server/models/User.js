const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["customer", "executor"],
    required: true,
  },
  studentId: {
    type: String,
  },
});

// Хеширование пароля
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const bcrypt = require("bcryptjs");
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", UserSchema);
