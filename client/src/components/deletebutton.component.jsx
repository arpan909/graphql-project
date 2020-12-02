import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import lodash from "lodash";
import { FETCH_POSTS_QUERY } from "../utils/getPostsQuery";

export default function DeleteButton({ postId, commentId, callback }) {
  const [confirmButton, setConfirmButton] = useState(false);
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_MUTATION;
  const [deletePost] = useMutation(mutation, {
    update(proxy, result) {
      setConfirmButton(false);
      if (!commentId) {
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
      }

      if (callback) callback();
    },
    variables: {
      postId,
      commentId,
    },
  });

  return (
    <>
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
    </>
  );
}

const DELETE_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      id
      userName
      comments {
        id
        userName
        body
        createdAt
      }
      body
      createdAt
    }
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      body
      comments {
        id
        userName
        body
        createdAt
      }
      userName
      createdAt
    }
  }
`;
