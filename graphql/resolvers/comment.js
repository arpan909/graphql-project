const { UserInputError, AuthenticationError } = require("apollo-server");
const Post = require("../../models/Post");
const auth = require("../../utils/auth");
module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const user = auth(context);
      if (body.trim() === "") {
        throw new UserInputError("Comment body cant be empty!", {
          errors: {
            body: "Comment Body Cant be empty!!!!!!!!!!!!!!!!!!!!",
          },
        });
      }
      const post = await Post.findById(postId);
      if (!post) {
        throw new UserInputError("Post not found!");
      }
      post.comments.unshift({
        body,
        userName: user.userName,
        createdAt: new Date().toISOString(),
      });
      await post.save();
      return post;
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { userName } = auth(context);
      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);
        if (post.comments[commentIndex].userName === userName) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not permited!");
        }
      } else {
        throw new UserInputError("Post not found!");
      }
    },
  },
};
