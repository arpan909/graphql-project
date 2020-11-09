import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Button, Form } from "semantic-ui-react";

export default function Register(props) {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const [addUser, { loading }] = useMutation(REGISTER_QUERY, {
    update(proxy, result) {
      console.log("Result:", result);
      props.history.push("/");
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });
  const onSubmit = (e) => {
    e.preventDefault();
    addUser();
  };
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="userName"
          type="text"
          error={errors.userName ? true : false}
          value={values.userName}
          onChange={onChange}
        ></Form.Input>
        <Form.Input
          label="Email"
          placeholder="Email..."
          name="email"
          type="email"
          error={errors.email ? true : false}
          value={values.email}
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirmedPassword"
          type="password"
          error={errors.confirmedPassword ? true : false}
          value={values.confirmedPassword}
          onChange={onChange}
        ></Form.Input>
        <Button type="submit" primary>
          Register
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
  mutation register(
    $userName: String!
    $email: String!
    $password: String!
    $confirmedPassword: String!
  ) {
    register(
      registerInput: {
        userName: $userName
        email: $email
        password: $password
        confirmedPassword: $confirmedPassword
      }
    ) {
      id
      email
      userName
      createdAt
      token
    }
  }
`;
