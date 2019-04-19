const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const CardSchema = new Schema(
  {
    id: Number,
    title: String,
    description: String,
    due_date: String,
    creator: Number,
    assignee: Number
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Card", CardSchema);