import React, { useContext } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Card, Label, Icon, Image, Button } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import LikeButton from "./likebutton.component";
import DeleteButton from "./deletebutton.component";

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
  const { user } = useContext(AuthContext);

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
        <LikeButton user={user} post={{ id, likes, likeCount }}></LikeButton>
        <Button labelPosition="right" onClick={commentOnPost}>
          <Button
            color="blue"
            as={Link}
            to={user ? `/posts/${id}` : "/login"}
            basic
          >
            <Icon name="comments" />
          </Button>
          <Label
            basic
            color="blue"
            pointing="left"
            style={{ paddingBottom: 12 }}
          >
            {commentCount}
          </Label>
        </Button>
        {user && user.userName === userName && (
          <DeleteButton postId={id}></DeleteButton>
        )}
      </Card.Content>
    </Card>
  );
}
