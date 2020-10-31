const { Schema, model } = require("mongoose");
const postSchema = new Schema({
  body: String,
  createdAt: String,
  userName: String,
  comments: [
    {
      body: String,
      createdAt: String,
      userName: String,
    },
  ],
  likes: [
    {
      userName: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Post", postSchema);
