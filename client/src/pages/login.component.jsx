import React, { useState, useContext } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../utils/useForm";
import { AuthContext } from "../context/auth";

export default function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(login, {
    userName: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(REGISTER_QUERY, {
    update(proxy, { data: { login: userData } }) {
      console.log(userData);
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      console.log(err.graphQLErrors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function login() {
    loginUser();
  }
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="userName"
          type="text"
          error={errors.UserName ? true : false}
          value={values.userName}
          onChange={onChange}
        ></Form.Input>

        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          error={errors.password ? true : false}
          value={values.password}
          onChange={onChange}
        ></Form.Input>

        <Button type="submit" primary>
          Log In
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((val) => (
              <li key={val}>{val}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const REGISTER_QUERY = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      id
      email
      userName
      createdAt
      token
    }
  }
`;
