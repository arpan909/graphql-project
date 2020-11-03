const { gql } = require("apollo-server");
module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    userName: String!
    comments: [Comment]!
    likes: [Like]!
  }

  type Comment {
    id: ID!
    body: String!
    userName: String!
    createdAt: String!
  }

  type Like {
    id: ID!
    userName: String!
    createdAt: String!
  }

  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post!
  }

  type User {
    id: ID!
    email: String!
    userName: String!
    createdAt: String!
    token: String!
  }

  input RegisterInput {
    userName: String!
    password: String!
    confirmedPassword: String!
    email: String!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(userName: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`;
