const { Schema, model } = require("mongoose");

const userSchema = new Schema(
// const studiosSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },

    name: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    }

  },
  
  {
    timeseries: true,
    timestamps: true,
  }

);

const User = model("User", userSchema);

module.exports = User;
