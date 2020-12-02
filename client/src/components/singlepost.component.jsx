import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useContext, useState } from "react";
import {
  Card,
  Grid,
  Segment,
  Dimmer,
  Loader,
  Image,
  Button,
  Icon,
  Label,
  Form,
} from "semantic-ui-react";
import moment from "moment";
import LikeButton from "./likebutton.component";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";
import DeleteButton from "./deletebutton.component";

export default function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  function deleteButtonCallback() {
    props.history.push("/");
  }
  const { data: { getPost } = {} } = useQuery(FETCH_POST, {
    variables: {
      postId,
    },
  });
  const [submitComment] = useMutation(SUBMIT_COMMENT, {
    update() {
      setComment("");
    },
    variables: {
      postId,
      body: comment,
    },
  });
  let postMarkup;
  if (!getPost) {
    postMarkup = (
      <Segment>
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>

        <Image src="/images/wireframe/short-paragraph.png" />
      </Segment>
    );
  } else {
    const {
      id,
      userName,
      body,
      createdAt,
      likeCount,
      likes,
      comments,
      commentCount,
    } = getPost;
    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated="right"
              size="small"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{userName}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr></hr>
              <Card.Content extra>
                <LikeButton
                  user={user}
                  post={{ id, likes, likeCount }}
                ></LikeButton>
                <Button
                  labelPosition="right"
                  as={Link}
                  to={user ? `/posts/${id}` : "/login"}
                >
                  <Button color="blue" basic>
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.userName === userName && (
                  <DeleteButton
                    postId={id}
                    callback={deleteButtonCallback}
                  ></DeleteButton>
                )}
              </Card.Content>
              {user && (
                <Card fluid>
                  <Card.Content>
                    <p>Enter a comment!</p>
                    <Form>
                      <div className="ui action input fluid">
                        <input
                          type="text"
                          placeholder="Write a Comment.."
                          name="comment"
                          value={comment}
                          onChange={(e) => {
                            setComment(e.target.value);
                          }}
                        ></input>
                        <button
                          type="submit"
                          className="ui button teal"
                          disabled={comment.trim() === ""}
                          onClick={submitComment}
                        >
                          Submit{" "}
                        </button>
                      </div>
                    </Form>
                  </Card.Content>
                </Card>
              )}
            </Card>
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.userName === comment.userName && (
                    <DeleteButton
                      commentId={comment.id}
                      postId={id}
                    ></DeleteButton>
                  )}
                  <Card.Header>{comment.userName}</Card.Header>
                  <Card.Meta>{moment(comment.createAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}
const SUBMIT_COMMENT = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      userName
      comments {
        id
        body
        userName
        createdAt
      }
      commentCount
      body
    }
  }
`;
const FETCH_POST = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      userName
      body
      createdAt
      likeCount
      likes {
        userName
        id
        createdAt
      }
      commentCount
      comments {
        id
        userName
        body
        createdAt
      }
    }
  }
`;
