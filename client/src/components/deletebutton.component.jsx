import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import lodash from "lodash";
import { FETCH_POSTS_QUERY } from "../utils/getPostsQuery";

export default function DeleteButton({ postId }) {
  const [confirmButton, setConfirmButton] = useState(false);
  const [deletePost] = useMutation(DELETE_MUTATION, {
    update(proxy, result) {
      setConfirmButton(false);
      const data = lodash.cloneDeep(
        proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        })
      );
      data.getPosts = data.getPosts.filter((post) => post.id !== postId);
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data,
      });
    },
    variables: {
      postId,
    },
  });

  return (
    <div>
      <Button
        color="linkedin"
        as="div"
        floated="right"
        onClick={() => setConfirmButton(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        onCancel={() => setConfirmButton(false)}
        open={confirmButton}
        onConfirm={deletePost}
      ></Confirm>
    </div>
  );
}

const DELETE_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
