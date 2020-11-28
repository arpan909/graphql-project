import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../utils/useForm";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../utils/getPostsQuery";
import lodash from "lodash";

export default function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    returnPartialData: true,
    update(proxy, result) {
      const data = lodash.cloneDeep(
        proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        })
      );
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data,
      });
      values.body = "";
    },
    onError(err) {
      console.log(err);
    },
  });
  function createPostCallback() {
    createPost();
  }
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Form.Input
            placeholder="Enter Body"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
            style={{ width: "100%" }}
          ></Form.Input>
          <Button
            type="submit"
            color="teal"
            style={{
              marginBottom: 20,
              marginLeft: "45%",
            }}
          >
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 5 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      userName
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
