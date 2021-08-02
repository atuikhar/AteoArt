import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Form, Button, Row, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";

import Loader from "./../components/Loader";

import { register } from "../actions/userActions";

import FormContainer from "../components/FormContainer";

const RegisterScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password Do Not Match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1 className="text-center">SignUp</h1>
      {message && <Message variant="danger"> {message}</Message>}
      {error && <Message variant="danger"> {error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-2" controlId="name">
          <Form.Label> Name </Form.Label>
          <Form.Control
            type="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-2" controlId="email">
          <Form.Label> Email Address </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label> Password </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-2" controlId="confirmPassword">
          <Form.Label> Confirm Password </Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="text-center">
          <Button type="submit">Register</Button>
        </Form.Group>
      </Form>
      <Row className="py-3">
        <Col>
          <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
            <Button className="btn btn-sm btn-info m-2">LogIn</Button>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
