const { AuthenticationError, UserInputError } = require("apollo-server");
const Post = require("../../models/Post");
const auth = require("../../utils/auth");
module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (!post) {
          throw new Error("Post not found!!!");
        }
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = auth(context);
      console.log(user);
      const newPost = new Post({
        body,
        user: user.id,
        userName: user.userName,
        createdAt: new Date().toISOString(),
      });
      const post = await newPost.save();
      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = auth(context);
      try {
        const post = await Post.findById(postId);
        if (user.userName === post.userName) {
          await post.deleteOne();
          return "Post Deleted!";
        } else {
          throw new AuthenticationError("Action not permited!");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async likePost(_, { postId }, context) {
      const { userName } = auth(context);
      const post = await Post.findById(postId);
      if (!post) {
        throw new UserInputError("Post not found!!!");
      }
      if (post.likes.find((l) => l.userName === userName)) {
        post.likes = post.likes.filter((l) => l.userName !== userName);
      } else {
        post.likes.push({ userName, createdAt: new Date().toISOString() });
      }
      await post.save();
      return post;
    },
  },
};
