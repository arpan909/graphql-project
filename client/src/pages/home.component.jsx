import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/postcard.component";
import { AuthContext } from "../context/auth";
import PostForm from "../components/postform.component";
import { FETCH_POSTS_QUERY } from "../utils/getPostsQuery";

export default function Home() {
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );
  console.log(posts);
  const { user } = useContext(AuthContext);

  return (
    <Grid columns={3}>
      <Grid.Row className="post-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm></PostForm>
          </Grid.Column>
        )}
        {loading ? (
          <Grid.Column>
            <h1>Loading......</h1>
          </Grid.Column>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}
