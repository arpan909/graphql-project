import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Card, Label, Icon, Image, Button } from "semantic-ui-react";

export default function PostCard({
  post: {
    id,
    body,
    userName,
    likes,
    likeCount,
    comments,
    commentCount,
    createdAt,
  },
}) {
  function likePost() {
    console.log("Like Post!!!");
  }
  function commentOnPost() {
    console.log("Comment on Post!!!");
  }
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{userName}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right" onClick={likePost}>
          <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
          <Label as="a" basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" onClick={commentOnPost}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label as="a" basic color="blue" pointing="left">
            {likeCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
}
