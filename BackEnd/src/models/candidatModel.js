const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { 
        type: String,
        required: true
    },

    lastName: { 
        type: String, 
        required: true 
    },

    email: { 
        type: String, 
        required: true, 
        unique: true 
    },

    password: { 
        type: String, 
        required: true 
    },

    domain: { 
        type: String 
    },

    level: { 
        type: String 
    },

    profile: { 
        type: String 
    },

    experience: { 
        type: Number 
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);


