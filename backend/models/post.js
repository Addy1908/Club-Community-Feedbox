const mongoose = require("mongoose");

// const user = require("./user");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  img: [{
    type: String,
  }],
  postType: {
    type: String,
  },
  collegeName: {
    type: String,
  },
  visible: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  }],

  comment: [
    {
      postedBy: {
        // type: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      date: {
        type: Date,
        default: Date.now,
      },
      message: {
        type: String,
      },
      reply: {
        postedBy: {
          // type: String,
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
        date: {
          type: Date,
          default: Date.now,
        },
        replyMsg: {
          type: String,
        },
      },
    },
  ],

  // reply:{
  //   postedBy:{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "users",
  //   },
  //   replyMsg:{
  //   type: String,
    
  //   },
  //   date: {
  //     type: Date,
  //     default: Date.now,
  //   },

  // }
});

module.exports = mongoose.model("posts", postSchema);
