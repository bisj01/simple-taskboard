const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const UserSchema = new Schema(
  {
    id: Number,
    username: String,
    full_name: String,
    email_address: Date
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", UserSchema);