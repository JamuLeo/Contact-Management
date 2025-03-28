// This is a schema or table for contacts 
// The user_id associates every user with a specific id as primary key 
// and retrieves only associated routes for that user

const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
      ref: "User",
    },

    name: {
      type: String,
      required: [true, "Please add contact name"],
    },

    email: {
      type: String,
      required: [true, "Please add contact email"],
    },

    phone: {
      type: String,
      required: [true, "Please add contact phone number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema); // Fixed model naming
