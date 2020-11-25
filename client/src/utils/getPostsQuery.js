import gql from "graphql-tag";
export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      userName
      createdAt
      likes {
        id
        userName
        createdAt
      }
      likeCount
      comments {
        id
        body
        userName
        createdAt
      }
      commentCount
    }
  }
`;
