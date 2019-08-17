const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoScheme = new Schema({
    id: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      required: false
    },
    complete: {
      type: Boolean,
      required: true,
      default: false
    },
    dateCreate: {
      type: String,
      required: true
    }
}, { autoIndex: false, versionKey: false });

const TODO = mongoose.model("Todo", todoScheme);
module.exports = TODO;
